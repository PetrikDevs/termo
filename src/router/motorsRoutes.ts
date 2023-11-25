import { MotorsController } from '../controller/MotorsController';
import router from '../config/router_config';

const testsController = new MotorsController();

router.get('/motors', testsController.getMotors);
router.post('/motors', testsController.setMotor);