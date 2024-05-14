import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import {account} from '../Appwrite/appwrite'
import {useNavigate} from 'react-router-dom'
import Logo from '../assets/Icon.png'
const MapComponent = () => {
  const navigate = useNavigate()
    
    const LogOut=()=>{
        let account = document.querySelector('.account')
        let logout =document.querySelector('.logout');
        if(logout.classList.contains('account-active')){
            logout.classList.remove('account-active');
        }
        else{
            logout.classList.add('account-active');
        }
    }

    const handleLogout =async()=>{
        try{
         await account.deleteSession("current")
         navigate("/")
        }
        catch(error){
         console.log(error)
        }
       }
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2t5bGFyLTAwNzEiLCJhIjoiY2x2bGtxOWJqMmN3ZzJtbDlvbDZia2R1YyJ9.HnrQGtU8_8U7l--OYXeksQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [75.56491, 26.84303],
      zoom: 16
    });

    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken
      }),
      'top-left'
    );

    const bounds = [
      [75.56192947806983, 26.838110924618533], // Southwest coordinates
      [75.56608035861046, 26.84799717164451]   // Northeast coordinates
    ];

    map.setMaxBounds(bounds);

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    map.addControl(geolocate);

    geolocate.on('geolocate', function (event) {
      const userLocation = event.coords; // User's coordinates
      map.setCenter([userLocation.longitude, userLocation.latitude]);
    });

    const userLocationLayer = {
      id: 'user-location',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: []
          }
        }
      },
      paint: {
        'circle-radius': 8,
        'circle-color': '#007cbf'
      }
    };

    map.on('load', function () {
      map.addLayer(userLocationLayer);

      geolocate.on('geolocate', function (event) {
        const userLocation = event.coords;
        const coordinates = [userLocation.longitude, userLocation.latitude];

        // Update user's location on the map
        map.getSource('user-location').setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: coordinates
          }
        });

        updateRoute(coordinates);
      });

      map.on('click', function (event) {
        const destinationCoordinates = [event.lngLat.lng, event.lngLat.lat];
        updateRoute(destinationCoordinates);
      });
    });

    function updateRoute(destinationCoordinates) {
      const userLocation = map.getSource('user-location')._data.geometry.coordinates;

      const endpoint = 'https://api.mapbox.com/directions/v5/mapbox/driving/' +
        userLocation[0] + ',' + userLocation[1] +
        ';' + destinationCoordinates[0] + ',' + destinationCoordinates[1] +
        '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          const route = data.routes[0].geometry;
          if (!map.getSource('route')) {
            map.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: route
              }
            });

            map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#3887be',
                'line-width': 5
              }
            });
          } else {
            map.getSource('route').setData({
              type: 'Feature',
              geometry: route
            });
          }
        });
    }

    return () => map.remove();
  }, []);

  return (
    <>
    <div id="map" className='' />
    <div className='absolute top-[80%] left-[75%]'>
    <div className='flex justify-between gap-10 px-10 py-2 items-center z-99'>

    <div className=' lg:w-[6.5rem] md:w-[7.5rem] w-[5rem] cursor-pointer  p-0'>
    <img className='' src={Logo} alt="" />
    </div>

    <div className=''>
    <p className='font-bold cursor-pointer text-[1rem] px-5 py-2 border-white text-white bg-orange-500 z-99 border-2' onClick={handleLogout}>Logout</p>
   </div>
   </div>
   </div>
    </>
  );
};

export default MapComponent;
