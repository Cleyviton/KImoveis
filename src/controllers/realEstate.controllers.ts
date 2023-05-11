import { Request, Response } from "express";
import createRealEstateService from "../services/realEstate/createRealEstate.services";
import { TRealEstateRequest } from "../interfaces/realEstate.interface";
import { RealEstate } from "../entities";
import getAllRealEstatesService from "../services/realEstate/getAllRealEstates.services";

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateData: TRealEstateRequest = req.body;

  const newRealEstate = await createRealEstateService(realEstateData);

  return res.status(201).json(newRealEstate);
};

const getAllRealEstatesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allRealEstates: RealEstate[] = await getAllRealEstatesService();

  return res.json(allRealEstates);
};

export { createRealEstateController, getAllRealEstatesController };
