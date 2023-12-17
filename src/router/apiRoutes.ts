import express from 'express';
import TestController from '../controller/testsController';
import ValveController from '../controller/valveController';

const routerApi = express.Router();
const testController = new TestController();
const valveController = new ValveController();

//tests
routerApi.get('/tests_all', testController.getAllTests);
routerApi.get('/test_last', testController.getLastTest);
routerApi.get('/tests_main', testController.getAllTestMain);
routerApi.get('/test/:id', testController.getTestById);

//timer
routerApi.get('/timer', testController.getTimer);
routerApi.post('/timer', testController.setTimer);

//valve
routerApi.get('/valve', valveController.getValve);
routerApi.post('/valve', valveController.setValve);

export default routerApi;