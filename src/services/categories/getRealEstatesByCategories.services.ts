import { Repository } from "typeorm";
import { TRealEstateByCategory } from "../../interfaces/categories.interface";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { realEstateByCategorySchema } from "../../schemas/categories.schemas";

const getAllrealEstatesByCategoryService = async (
  categoryId: number
): Promise<any> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const realStatesCategory: Category | null = await categoryRepo.findOne({
    where: {
      id: categoryId,
    },
    relations: { realEstate: true },
  });

  const returnRealStates: TRealEstateByCategory =
    realEstateByCategorySchema.parse(realStatesCategory);

  return returnRealStates;
};

export default getAllrealEstatesByCategoryService;
