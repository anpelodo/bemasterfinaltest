import express, { Request, Response } from "express";

import { userController } from "../dependencies";

const userRouter = express.Router();

const temporalMiddleware = (_req: Request, resp: Response) => {
  resp.status(200).send("User");
};

userRouter.get("/user", userController.getUser.bind(userController));
userRouter.post("/user/login", temporalMiddleware);
userRouter.post("/user/signup", temporalMiddleware);
userRouter.delete("/user/:id", temporalMiddleware);
userRouter.patch("/user/:id", temporalMiddleware);

export default userRouter;
