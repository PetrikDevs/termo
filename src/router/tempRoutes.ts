import TempController from '../controller/TempController';
import DbService from '../service/dbService';
import express from 'express';

const routerTemp = express.Router();
const dbService = new DbService();
const tempController = new TempController(dbService);

routerTemp.get('/temp', tempController.getLastTest);
routerTemp.get('/tempall', tempController.getAllTests);

export default routerTemp;
