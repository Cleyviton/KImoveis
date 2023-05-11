import { z } from "zod";

const categorySchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

const realEstateSchema = z.object({
  id: z.number(),
  size: z.number(),
  value: z.number(),
  sold: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const categorySchemaRequest = categorySchema.omit({ id: true });

const realEstateByCategorySchema = categorySchema.extend({
  realEstate: realEstateSchema.array(),
});

export {
  categorySchema,
  categorySchemaRequest,
  realEstateByCategorySchema,
  realEstateSchema,
};
