import { Repository } from "typeorm";
import { TUserRequest, TUserResponse } from "../../interfaces/users.interface";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { hash } from "bcryptjs";
import { userSchemaResponse } from "../../schemas/users.schemas";

const createUserService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const newUser: User = userRepo.create(userData);

  await userRepo.save(newUser);

  const user: TUserResponse = userSchemaResponse.parse(newUser);

  return user;
};

export default createUserService;
