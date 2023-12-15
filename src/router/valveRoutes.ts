import ValveController from '../controller/valveController';
import express from 'express';

const valveRouter = express.Router();

const valveController = new ValveController();

valveRouter.get('/valve', valveController.getValve);
valveRouter.post('/valve', valveController.setValve);

export default valveRouter;