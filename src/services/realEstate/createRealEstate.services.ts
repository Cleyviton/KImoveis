import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { TRealEstateRequest } from "../../interfaces/realEstate.interface";
import { Address, Category, RealEstate } from "../../entities";
import { TRealEstate } from "../../interfaces/categories.interface";
import { realEstateSchema } from "../../schemas/categories.schemas";

const createRealEstateService = async (
  realEstateData: TRealEstateRequest
): Promise<RealEstate> => {
  const { address, categoryId, ...realEstateNewData } = realEstateData;

  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const categoriesRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findCategory: Category | null = await categoriesRepo.findOneBy({
    id: categoryId!,
  });

  if (categoryId && !findCategory) {
    throw new AppError("Category not found", 404);
  }

  const createAddress: Address = addressRepo.create(address);
  await addressRepo.save(createAddress);

  const createRealEstate: RealEstate = realEstateRepo.create({
    ...realEstateNewData,
    address: createAddress,
    category: findCategory!,
  });

  const newRealEstate: RealEstate = await realEstateRepo.save(createRealEstate);

  return newRealEstate;
};

export default createRealEstateService;
