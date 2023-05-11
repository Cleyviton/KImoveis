import { NextFunction, Request, Response } from "express";
import { TUserRequest } from "../interfaces/users.interface";
import { Repository } from "typeorm";
import { Category, User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const verifyCategoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const categoryId: number = parseInt(req.params.id);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const existsUser: boolean = await categoryRepository.exist({
    where: { id: categoryId },
  });

  if (!existsUser) {
    throw new AppError("Category not found", 404);
  }

  return next();
};

export default verifyCategoryExistsMiddleware;
