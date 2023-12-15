import e from 'express';
import { TestsController } from '../controller/TestsController';
import express from 'express';

const routerTest = express.Router();
const testsController = new TestsController();

routerTest.get('/tests', testsController.getAllTests);
routerTest.post('/tests', testsController.createTest);

export default routerTest;