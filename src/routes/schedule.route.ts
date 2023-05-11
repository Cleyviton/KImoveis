import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import verifyTokenIsValidMiddleware from "../middlewares/verifyTokenIsValid.middleware";
import {
  createScheduleController,
  getAllSchedulesController,
} from "../controllers/schedule.controllers";
import verifyAdminPermissionMidleware from "../middlewares/verifyAdminPermission.middleware";
import { schedulesRequestSchema } from "../schemas/schedule.schemas";
import verifyRealEstateExists from "../middlewares/verifyRealEstateExists.middleware";
import validScheduleMiddleware from "../middlewares/validSchedule.middleware";

const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "/",
  verifyTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(schedulesRequestSchema),
  verifyRealEstateExists,
  validScheduleMiddleware,
  createScheduleController
);

scheduleRoutes.get(
  "/realEstate/:id",
  verifyTokenIsValidMiddleware,
  verifyAdminPermissionMidleware,
  getAllSchedulesController
);

export default scheduleRoutes;
