import { z } from "zod";
import {
  addressSchemaRequest,
  realEstateSchema,
  realEstateSchemaRequest,
} from "../schemas/realEstate.schemas";

type TRealEstate = z.infer<typeof realEstateSchema>;
type TRealEstateRequest = z.infer<typeof realEstateSchemaRequest>;
type TAddressRequest = z.infer<typeof addressSchemaRequest>;

export { TRealEstate, TRealEstateRequest, TAddressRequest };
