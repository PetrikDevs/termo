import { TestsController } from '../controller/TestsController';
import router from '../config/router_config';

const testsController = new TestsController();

router.get('/tests', testsController.getTests);
router.post('/tests', testsController.createTest);
