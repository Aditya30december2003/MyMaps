import React , {useState} from 'react'
import Logo from '../assets/Icon.png'
import Hero_video from '../assets/Bg-Video.mp4'
import {Link , useNavigate} from 'react-router-dom'
import {account} from '../Appwrite/appwrite'
const Home = (props) => {
  const navigate = useNavigate()
  const [user , setUser] = useState({
   email:"",
   password:""
  })

  const loginUser = async(e)=>{
    e.preventDefault()

    try{
      await account.createEmailPasswordSession(user.email , user.password)
      navigate('/home')
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className='w-full h-screen relative'>
        <video className='w-full h-screen object-cover' src={Hero_video}
       autoPlay 
       muted 
       loop 
       /> 
       {/* overlay */}
       <div className='absolute w-full h-full bg-gray-900/30 top-0 left-0'></div>

       <div className='absolute w-full top-[1%]  items-center  text-white '>

        {/* Navbar */}
        <div className='flex justify-between gap-10 px-10 py-2 items-center'>

        <div className=' lg:w-[6.5rem] md:w-[7.5rem] w-[5rem] cursor-pointer  p-0'>
        <img className='' src={Logo} alt="" />
        </div>

        <div className=''>
        <p className='font-bold text-[2rem]'>My <span className='text-orange-500'>College</span> Maps</p>
        </div>

        </div>
  
  {/* Sign */}

  <div className='flex items-center gap-6 flex-col lg:flex-row w-[90%] px-10 mx-[2%] '>
   <div className='w-[50%] flex flex-col items-center'>
     <h1 className='text-white text-[1.7rem] font-bold text-center md:text-[2.2rem] lg:text-left lg:text-[2.3rem]'>Welcome To <span className='text-[4rem] text-orange-600'>My College Maps</span></h1>
     <button className=' lg:items-center border-2 border-orange-500  hover:bg-orange-500 p-2 mt-10 w-full rounded-[2rem] hidden lg:flex'>
       {/* <img className='w-[15px] mr-0' src={} alt="" /> */}
       <p className='text-center mx-auto text-white font-bold'>Join Now</p> 
    </button>
    </div>

    <div className='lg:w-[35%] md:w-[60%] w-[92%] mx-auto mt-10 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white rounded-md'>
        {/* card-header */}

        {/* card-content */}
        <div className='py-4'>
          <div className='flex flex-col gap-3'>
          <input onChange={(e)=>{
            setUser({
              ...user,
              email:e.target.value
            })
          }} className='p-3  text-[1.1rem] border-2 text-black outline-none hover:border-orange-600 rounded-md' type="text" placeholder='Email or Phone' />
          <input
          onChange={(e)=>{
            setUser({
              ...user,
              password:e.target.value
            })
          }}
           className='p-3 text-black text-[1.1rem] border-2 outline-none hover:border-orange-600 rounded-md'type="password" placeholder='Password' />
          </div>
          <div className='mt-2  cursor-pointer text-orange-500 w-[38%] p-2 rounded-[2rem]   font-bold hover:underline hover:bg-blue-300/80'>
          <p className='text-center text-[0.8rem]'>Forgot Password?</p>
          </div>
          <div onClick={loginUser} className='bg-orange-600 hover:bg-orange-500 text-white w-[90%] rounded-[2.1rem] text-center mt-2 py-3 text-[1.1rem] mx-auto cursor-pointer'>
          <button  className='font-bold ' >Login</button>
          </div>
        </div>

        <div className='text-center mt-8 text-black'>
          <p className='text-orange-400 font-bold'>New to MyCollegeMaps? <Link to ='/signup' className='mt-2  cursor-pointer text-orange-500 w-[38%] p-2 rounded-[2rem]   font-bold hover:underline hover:bg-orange-300/80'>Join Now</Link></p>
      </div>

      </div>

  </div>

</div>

</div>
  )
}

export default Home


