import { Request, Response } from "express";
import { TCategoryRequest } from "../interfaces/categories.interface";
import { Category } from "../entities";
import createCategoriesService from "../services/categories/createCategories.services";
import getAllCategoriesService from "../services/categories/getAllCategories.services";
import getAllrealEstatesByCategoryService from "../services/categories/getRealEstatesByCategories.services";
import { TRealEstateByCategory } from "../interfaces/categories.interface";

const createCategorieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: TCategoryRequest = req.body;

  const newCategory: Category = await createCategoriesService(categoryData);

  return res.status(201).json(newCategory);
};

const getCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories: Category[] = await getAllCategoriesService();

  return res.json(categories);
};

const getRealEstatesByCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = parseInt(req.params.id);

  const realStatesByCategory: TRealEstateByCategory =
    await getAllrealEstatesByCategoryService(categoryId);

  return res.json(realStatesByCategory);
};

export {
  createCategorieController,
  getCategoriesController,
  getRealEstatesByCategoriesController,
};
