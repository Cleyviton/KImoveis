import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";

const getAllRealEstatesService = async (): Promise<RealEstate[]> => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const allRealEstates: RealEstate[] | null = await realEstateRepo.find({
    relations: {
      address: true,
    },
  });

  return allRealEstates;
};

export default getAllRealEstatesService;
