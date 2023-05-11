import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Address } from "../entities";
import { AppDataSource } from "../data-source";
import { TAddressRequest } from "../interfaces/realEstate.interface";
import { AppError } from "../error";

const verifyAddressExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const addressData: TAddressRequest = req.body.address;
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  if (!addressData.number) {
    addressData.number = "";
  }

  const addressExist: Address | null = await addressRepo.findOneBy({
    city: addressData.city,
    state: addressData.state,
    street: addressData.street,
    zipCode: addressData.zipCode,
    number: addressData.number || "",
  });

  if (addressExist) {
    throw new AppError("Address already exists", 409);
  }

  return next();
};

export default verifyAddressExistsMiddleware;
