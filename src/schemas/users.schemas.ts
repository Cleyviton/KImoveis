import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().optional().default(false),
  password: z.string().max(120),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

const userSchemaRequest = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userSchemaResponse = userSchema.omit({
  password: true,
});

const allUsersSchemaResponse = userSchemaResponse.array();

const updateUserSchemaRequest = userSchemaRequest
  .partial()
  .omit({ admin: true });

export {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
  allUsersSchemaResponse,
  updateUserSchemaRequest,
};
