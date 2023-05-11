import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import {
  createRealEstateController,
  getAllRealEstatesController,
} from "../controllers/realEstate.controllers";
import verifyTokenIsValidMiddleware from "../middlewares/verifyTokenIsValid.middleware";
import { realEstateSchemaRequest } from "../schemas/realEstate.schemas";
import verifyAddressExistsMiddleware from "../middlewares/verifyAddressExists.middleware";
import verifyAdminPermissionMidleware from "../middlewares/verifyAdminPermission.middleware";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "/",
  ensureDataIsValidMiddleware(realEstateSchemaRequest),
  verifyTokenIsValidMiddleware,
  verifyAdminPermissionMidleware,
  verifyAddressExistsMiddleware,
  createRealEstateController
);

realEstateRoutes.get("/", getAllRealEstatesController);

export default realEstateRoutes;
