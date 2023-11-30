import { SzelepController } from '../controller/SzelepController';
import express from 'express';

const routerMotors = express.Router();
const szelepController = new SzelepController();

routerMotors.get('/szelep', szelepController.getSzelep);
routerMotors.post('/szelep', szelepController.setSzelep);

export default routerMotors;