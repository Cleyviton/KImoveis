import { z } from "zod";
import {
  allUsersSchemaResponse,
  updateUserSchemaRequest,
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
} from "../schemas/users.schemas";
import { DeepPartial } from "typeorm";

type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userSchemaRequest>;
type TUserResponse = z.infer<typeof userSchemaResponse>;
type TAllUsersResponse = z.infer<typeof allUsersSchemaResponse>;
type TUpdateUserRequest = DeepPartial<TUserRequest>;

export {
  TUser,
  TUserRequest,
  TUserResponse,
  TAllUsersResponse,
  TUpdateUserRequest,
};
