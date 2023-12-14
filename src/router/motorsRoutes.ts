import ValveController from '../controller/valveController';
import express from 'express';

const routerMotors = express.Router();

const valveController = new ValveController();

routerMotors.get('/valve', valveController.getValve);
routerMotors.post('/valve', valveController.setValve);

export default routerMotors;