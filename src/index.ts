import * as dotenv from 'dotenv';
import App from "./app";
import DbService from './service/dbService';

dotenv.config(); 
const app = new App(3000, new DbService());