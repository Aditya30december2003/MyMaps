import { Client, Account , Databases} from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66435d74001f8e279b2b');

export const account = new Account(client);
export { ID } from 'appwrite';

//Database
export const database = new Databases(client , "66435f83000e91c06614")