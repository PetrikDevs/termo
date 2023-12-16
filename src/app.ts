import express, { json } from 'express';
import routerApi from './router/apiRoutes';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import DbService from './service/dbService';

class App {
    private app: express.Application;
    private port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    private dbService: DbService = new DbService();

    constructor() {
        this.app = express();
        this.config();
        this.dbService.init();
        this.routes();
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
      this.app.use('/api', routerApi);
    }
    
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default App;