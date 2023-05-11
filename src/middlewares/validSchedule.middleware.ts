import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Schedule } from "../entities";

const validScheduleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { date, hour, realEstateId } = req.body;
  const userId: number = res.locals.userId;
  const verifyHour: number = parseInt(hour);
  const newDate: Date = new Date(date);
  const day: number = newDate.getDay();

  if (day > 4) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  if (verifyHour < 8 || verifyHour > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const scheduleExists: Schedule | null = await scheduleRepo
    .createQueryBuilder("schedule")
    .innerJoinAndSelect("schedule.user", "user")
    .innerJoinAndSelect("schedule.realEstate", "realEstate")
    .andWhere("schedule.date = date", { date: date })
    .andWhere("schedule.hour = hour", { hour: hour })
    .andWhere("schedule.realEstate.id = realEstateId", {
      realEstateId: realEstateId,
    })
    .getOne();

  if (scheduleExists) {
    if (scheduleExists.user.id == userId) {
      throw new AppError(
        "User schedule to this real estate at this date and time already exists",
        409
      );
    } else {
      throw new AppError(
        "Schedule to this real estate at this date and time already exists",
        409
      );
    }
  }

  return next();
};

export default validScheduleMiddleware;
