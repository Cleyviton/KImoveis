import { Request, Response, Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import verifyTokenIsValidMiddleware from "../middlewares/verifyTokenIsValid.middleware";
import { categorySchemaRequest } from "../schemas/categories.schemas";
import {
  createCategorieController,
  getCategoriesController,
  getRealEstatesByCategoriesController,
} from "../controllers/categories.controller";
import verifyCategoryExistsMiddleware from "../middlewares/verifyCategoryExists.middleware";
import verifyAdminPermissionMidleware from "../middlewares/verifyAdminPermission.middleware";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "/",
  ensureDataIsValidMiddleware(categorySchemaRequest),
  verifyTokenIsValidMiddleware,
  verifyAdminPermissionMidleware,
  createCategorieController
);

categoriesRoutes.get("/", getCategoriesController);

categoriesRoutes.get(
  "/:id/realEstate",
  verifyCategoryExistsMiddleware,
  getRealEstatesByCategoriesController
);

export default categoriesRoutes;
