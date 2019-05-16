import express from "express";
import fetch from "node-fetch";
import logger from "../../../utils/logger";

import { MOCK_USER_API } from "../../../constants";

export default async (req: express.Request, res: express.Response) => {
  logger.debug(`[User.getById] request for userId: ${req.params.userId}`);

  const user = await fetch(`${MOCK_USER_API}${req.params.userId}`).then(
    apiResp => apiResp.json()
  );
  res.json(user);
};
