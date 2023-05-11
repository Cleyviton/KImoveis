import { Request, Response } from "express";
import { Schedule } from "../entities";
import getAllSchedulesServices from "../services/schedule/getAllSchedules.services";
import {
  IScheduleResponse,
  TScheduleRequest,
} from "../interfaces/schedules.interface";
import createScheduleServices from "../services/schedule/createSchedule.services";

const createScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = res.locals.userId;
  const scheduleData: TScheduleRequest = req.body;

  const newSchedule: IScheduleResponse = await createScheduleServices(
    userId,
    scheduleData
  );

  return res.status(201).json(newSchedule);
};

const getAllSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateId: number = parseInt(req.params.id);

  const schedulesData: Schedule = await getAllSchedulesServices(realEstateId);

  return res.json(schedulesData);
};

export { createScheduleController, getAllSchedulesController };
