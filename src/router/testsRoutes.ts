import { TestsController } from '../controller/TestsController';
import express from 'express';

const router = express.Router();
const testsController = new TestsController();

router.get('/tests', testsController.getTests);
router.post('/tests', testsController.createTest);
router.get('/temp', testsController.getLastTest);


export default router;