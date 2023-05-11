import { z } from "zod";
import {
  categorySchema,
  categorySchemaRequest,
  realEstateByCategorySchema,
  realEstateSchema,
} from "../schemas/categories.schemas";

type TCategory = z.infer<typeof categorySchema>;
type TCategoryRequest = z.infer<typeof categorySchemaRequest>;
type TRealEstate = z.infer<typeof realEstateSchema>;
type TRealEstateByCategory = z.infer<typeof realEstateByCategorySchema>;

export { TCategory, TCategoryRequest, TRealEstate, TRealEstateByCategory };
