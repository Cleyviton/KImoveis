import { NextFunction, Request, Response } from "express";
import { TUserRequest } from "../interfaces/users.interface";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const verifyEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const newUser: TUserRequest = req.body;
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  if (!newUser.email) {
    next();
  }

  const existsUser: boolean = await usersRepository.exist({
    where: { email: newUser.email },
  });

  if (existsUser) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export default verifyEmailExists;
