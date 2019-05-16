import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

import { SERVER } from '../constants';
import logger from '../utils/logger';


class App {
  public app: express.Application;

  constructor(){
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    // initialize middleware
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join('/', 'views'));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use((req, res, next)=>{
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
      next();
    });
  }

  private routes() {
    logger.debug(`[app] loading routes from "${SERVER.ROUTES_DIR}" directory`);
    fs.readdirSync(path.join(__dirname, '../', SERVER.ROUTES_DIR))
      .map(file => {
        this.app.use(
          SERVER.API_PATH_PREFIX,
          require('../' + SERVER.ROUTES_DIR + '/' + file)
        );
      });
  }
}

export default new App().app;
