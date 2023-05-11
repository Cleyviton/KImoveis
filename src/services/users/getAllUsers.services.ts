import { Repository } from "typeorm";
import { AppError } from "../../error";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TAllUsersResponse } from "../../interfaces/users.interface";
import { allUsersSchemaResponse } from "../../schemas/users.schemas";

const getAllUserService = async (): Promise<TAllUsersResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const usersData: User[] = await userRepo.find();

  const returnUsers: TAllUsersResponse =
    allUsersSchemaResponse.parse(usersData);

  return returnUsers;
};

export default getAllUserService;
