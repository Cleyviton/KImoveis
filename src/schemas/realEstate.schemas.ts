import { z } from "zod";
import { categorySchema } from "./categories.schemas";

const addressSchema = z.object({
  id: z.number(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).optional().nullable(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const addressSchemaRequest = addressSchema.omit({ id: true });

const realEstateSchema = z.object({
  category: categorySchema,
  id: z.number(),
  sold: z.boolean().default(false),
  value: z.union([z.string(), z.number()]),
  size: z.number().positive(),
  address: addressSchemaRequest,
  createdAt: z.string(),
  updatedAt: z.string(),
});

const realEstateSchemaRequest = realEstateSchema
  .omit({
    category: true,
    id: true,
    sold: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    categoryId: z.number().optional(),
  });

export { realEstateSchema, realEstateSchemaRequest, addressSchemaRequest };
