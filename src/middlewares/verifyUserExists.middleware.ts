import { NextFunction, Request, Response } from "express";
import { TUserRequest } from "../interfaces/users.interface";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const verifyUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = parseInt(req.params.id);

  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const existsUser: boolean = await usersRepository.exist({
    where: { id: userId },
  });

  if (!existsUser) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default verifyUserExistsMiddleware;
