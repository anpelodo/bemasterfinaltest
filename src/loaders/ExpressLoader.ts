import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";

import { apiRouter } from "../routes";

export default (app: Application) => {
  app.use(morgan("tiny"));
  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.status(200).send("ok");
  });

  app.use("/api", apiRouter);
};
