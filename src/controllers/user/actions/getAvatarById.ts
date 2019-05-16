import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import logger from "../../../utils/logger";

import { MOCK_USER_API, IMAGE_DIR } from "../../../constants";

export default async (req: express.Request, res: express.Response) => {
  logger.debug(`[User.getAvatarById] request for userId: ${req.params.userId}`);

  let img = "";
  const imageFilePath = `${path.resolve(__dirname, IMAGE_DIR)}/${
    req.params.userId
  }.txt`;

  if (fs.existsSync(imageFilePath)) {
    img = fs.readFileSync(imageFilePath).toString("base64");
  } else {
    const user = await fetch(`${MOCK_USER_API}${req.params.userId}`).then(
      apiResp => apiResp.json()
    );
    await fetch(user.data.avatar)
      .then(apiRes => apiRes.buffer())
      .then(buffer => {
        img = buffer.toString("base64");
        fs.writeFileSync(imageFilePath, img);
      });
  }

  res.writeHead(200, {
    "Content-Type": "image/jpeg",
    "Content-Length": img.length
  });
  res.end(img);
};
