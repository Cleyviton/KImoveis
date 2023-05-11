import { AppError } from "../../error";
import {
  TUpdateUserRequest,
  TUserResponse,
} from "../../interfaces/users.interface";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { userSchemaResponse } from "../../schemas/users.schemas";

const updateUserService = async (
  userData: TUpdateUserRequest,
  userId: number,
  userParamsId: number,
  adminPermission: boolean
): Promise<TUserResponse> => {
  if (!adminPermission) {
    if (userId !== userParamsId) {
      throw new AppError("Insufficient permission", 403);
    }
  }

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const oldUserdata: User | null = await userRepo.findOneBy({
    id: userParamsId,
  });

  const newUser: User = userRepo.create({ ...oldUserdata, ...userData });

  await userRepo.save(newUser);

  const returnUser: TUserResponse = userSchemaResponse.parse(newUser);

  return returnUser;
};

export default updateUserService;
