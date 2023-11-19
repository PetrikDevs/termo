import { MotorsController } from '../controller/MotorsController';
import express from 'express';

const router = express.Router();
const testsController = new MotorsController();

router.get('/motors', testsController.getMotors);
router.post('/motors', testsController.setMotor);


export default router;