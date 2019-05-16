import express from 'express';
import bootable from 'app-boot';
import app from './lib/app';

import { Error } from './types';

import { SERVER } from './constants';
import logger from './utils/logger';

class AppServer {

  public app: express.Application;
  private boot: any;
  constructor(app: express.Application) {
    this.app = app;

    this.app.once('booted', () => this.app.set('booted', true));

    this.boot = bootable(this.app);

    this.boot
      .phase(this.startServer);

    this.boot(this.onReady);
  }

  private startServer(app: express.Application, next: express.NextFunction) {
    app.listen(process.env.PORT || SERVER.PORT, async (err: Error) => {
      if (err) {
        logger.error(`[server] app error ${err.message}`);
        logger.error(`[server] app start error: ${err.message}`);
        process.exit(1);
        return;
      }
      next();
    });
  }

  private onReady(error: Error) {
    if (error) {
      throw error;
    }
    logger.info(`API's are running on  - ${SERVER.PORT}${SERVER.API_PATH_PREFIX}`);
  }
}

export  = new AppServer(app);
