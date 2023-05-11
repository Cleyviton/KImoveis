import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { TUserRequest } from "../interfaces/users.interface";

const ensureDataIsValidMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const dataValidated: TUserRequest = schema.parse(req.body);

    req.body = dataValidated;

    return next();
  };

export default ensureDataIsValidMiddleware;
