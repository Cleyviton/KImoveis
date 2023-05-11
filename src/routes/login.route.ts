import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { loginSchema } from "../schemas/login.schemas";
import createLoginController from "../controllers/login.controller";

const loginRoutes: Router = Router();

loginRoutes.post(
  "/",
  ensureDataIsValidMiddleware(loginSchema),
  createLoginController
);

export default loginRoutes;
