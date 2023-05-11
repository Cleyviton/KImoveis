import { z } from "zod";
import { userSchema } from "./users.schemas";
import { realEstateSchema } from "./realEstate.schemas";

const schedulesSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
  user: userSchema,
  realEstate: realEstateSchema,
});

const schedulesRequestSchema = schedulesSchema.omit({
  id: true,
  user: true,
  realEstate: true,
});

export { schedulesSchema, schedulesRequestSchema };
