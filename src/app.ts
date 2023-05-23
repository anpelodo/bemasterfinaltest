import express from "express";

import loaders from "./loaders";
// Create Express server
const app = express();

loaders(app);

export default app;
