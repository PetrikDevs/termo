import { TestsController } from '../controller/TestsController';
import express from 'express';
import { Test } from '../model/tests';

const router = express.Router();
const testsController = new TestsController();

router.get('/tests', testsController.getTests);
router.post('/tests', testsController.createTest);


export default router;