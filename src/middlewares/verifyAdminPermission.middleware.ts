import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const verifyAdminPermissionMidleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdmin: boolean = res.locals.adminPermission;

  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default verifyAdminPermissionMidleware;
