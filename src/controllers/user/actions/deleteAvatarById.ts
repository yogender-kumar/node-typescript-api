import express from "express";
import fs from "fs";
import path from "path";
import logger from "../../../utils/logger";

import { IMAGE_DIR } from "../../../constants";

export default async (req: express.Request, res: express.Response) => {
  logger.debug(`[User.deleteAvatarById] request for userId: ${req.params.userId}`);

  const imageFilePath = `${path.resolve(__dirname, IMAGE_DIR)}/${
    req.params.userId
  }.txt`;

  fs.unlinkSync(imageFilePath);
  res.status(204).end();
};
