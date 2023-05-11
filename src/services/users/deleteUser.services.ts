import { AppError } from "../../error";

import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";

const deleteUserService = async (user: User): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  await userRepo.softRemove(user);

  return;
};

export default deleteUserService;
