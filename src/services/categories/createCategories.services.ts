import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppError } from "../../error";
import { TCategoryRequest } from "../../interfaces/categories.interface";
import { AppDataSource } from "../../data-source";

const createCategoriesService = async (
  categoryData: TCategoryRequest
): Promise<Category> => {
  const categoriesRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryExist: boolean = await categoriesRepo.exist({
    where: {
      name: categoryData.name,
    },
  });

  if (categoryExist) {
    throw new AppError("Category already exists", 409);
  }

  const newCategory: Category = await categoriesRepo.save(categoryData);

  return newCategory;
};

export default createCategoriesService;
