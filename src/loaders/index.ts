import { config as dotEnvConfig } from "dotenv";
import { Application } from "express";

import config from "../configs";
import ExpressLoader from "./ExpressLoader";

export default (app: Application) => {
  dotEnvConfig();

  ExpressLoader(app);

  app.set("port", config.port);
};
