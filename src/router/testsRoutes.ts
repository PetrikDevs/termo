
import express from 'express';
import TestController from '../controller/TestsController';

const routerTest = express.Router();
const testsController = new TestController();

routerTest.get('/tests', testsController.getAllTests);
routerTest.post('/tests', testsController.createTest);

export default routerTest;