import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { RealEstate } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const verifyRealEstateExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const realEstateId: number = parseInt(req.body.realEstateId);

  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateExists: boolean = await realEstateRepo.exist({
    where: {
      id: realEstateId,
    },
  });

  if (!realEstateExists) {
    throw new AppError("RealEstate not found", 404);
  }

  return next();
};

export default verifyRealEstateExists;
