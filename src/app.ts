import express, { json } from 'express';
import routerMotors from './router/motorsRoutes';
import routerTest from './router/testsRoutes';
import routerTemp from './router/tempRoutes';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

class App {
    private app: express.Application;
    private port: number;
    private dbService: any;

    constructor(port: number) {
        this.app = express();
        this.config();
        this.routes();
        this.port = port;
        this.start();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors(
          {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE']
          }
        ));
        this.app.use(json());
        this.app.use(morgan('combined'));
    }
    routes() {
      this.app.use(routerMotors);
      this.app.use(routerTest);
      this.app.use(routerTemp);
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default App;