import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import {
  updateUserSchemaRequest,
  userSchemaRequest,
} from "../schemas/users.schemas";
import verifyEmailExists from "../middlewares/verifyEmailExists.middleware";
import {
  createUsersController,
  deleteUsersController,
  getAllUsersController,
  updateUsersController,
} from "../controllers/users.controllers";
import verifyTokenIsValidMiddleware from "../middlewares/verifyTokenIsValid.middleware";
import verifyUserExistsMiddleware from "../middlewares/verifyUserExists.middleware";
import verifyUserDeletedMiddleware from "../middlewares/verifyUserDeleted.middleware";
import verifyAdminPermissionMidleware from "../middlewares/verifyAdminPermission.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "/",
  ensureDataIsValidMiddleware(userSchemaRequest),
  verifyEmailExists,
  createUsersController
);

userRoutes.get(
  "/",
  verifyTokenIsValidMiddleware,
  verifyAdminPermissionMidleware,
  getAllUsersController
);

userRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateUserSchemaRequest),
  verifyTokenIsValidMiddleware,
  verifyUserExistsMiddleware,
  updateUsersController
);

userRoutes.delete(
  "/:id",
  verifyTokenIsValidMiddleware,
  verifyUserExistsMiddleware,
  verifyAdminPermissionMidleware,
  verifyUserDeletedMiddleware,
  deleteUsersController
);

export default userRoutes;
