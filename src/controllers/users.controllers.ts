import { Request, Response } from "express";
import {
  TAllUsersResponse,
  TUpdateUserRequest,
  TUserRequest,
  TUserResponse,
} from "../interfaces/users.interface";
import createUserService from "../services/users/createUsers.services";
import getAllUserService from "../services/users/getAllUsers.services";
import updateUserService from "../services/users/updateUser.services";
import deleteUserService from "../services/users/deleteUser.services";
import { User } from "../entities";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TAllUsersResponse = await getAllUserService();

  return res.json(users);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUpdateUserRequest = req.body;
  const userId: number = parseInt(res.locals.userId);
  const userParamsId: number = parseInt(req.params.id);
  const adminPermission: boolean = res.locals.adminPermission;

  const newUser: TUserResponse = await updateUserService(
    userData,
    userId,
    userParamsId,
    adminPermission
  );
  return res.json(newUser);
};

const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: User = res.locals.user;

  await deleteUserService(user);

  return res.status(204).send();
};

export {
  createUsersController,
  getAllUsersController,
  updateUsersController,
  deleteUsersController,
};
