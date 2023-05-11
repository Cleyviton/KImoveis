import { NextFunction, Request, Response } from "express";
import { TUserRequest } from "../interfaces/users.interface";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const verifyUserDeletedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);
  const userId: number = parseInt(req.params.id);

  const user: User | null = await usersRepository.findOneBy({
    id: userId,
  });

  if (user?.deletedAt) {
    throw new AppError("User not found", 404);
  }

  res.locals.user = user;

  return next();
};

export default verifyUserDeletedMiddleware;
