import {TempController} from '../controller/TempController';
import router from '../config/router_config';

const tempController = new TempController();

router.get('/temp', tempController.getLastTest);
