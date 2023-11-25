import { MotorsController } from '../controller/MotorsController';
import express from 'express';

const routerMotors = express.Router();
const motController = new MotorsController();

routerMotors.get('/motors', motController.getMotors);
routerMotors.post('/motors', motController.setMotor);

export default routerMotors;