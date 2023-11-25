import {TempController} from '../controller/TempController';
import express from 'express';

const routerTemp = express.Router();
const tempController = new TempController();

routerTemp.get('/temp', tempController.getLastTest);
routerTemp.get('/tempall', tempController.getAllTests);

export default routerTemp;
