import { z } from "zod";
import {
  schedulesRequestSchema,
  schedulesSchema,
} from "../schemas/schedule.schemas";

type TSchedule = z.infer<typeof schedulesSchema>;
type TScheduleRequest = z.infer<typeof schedulesRequestSchema>;
interface IScheduleResponse {
  message: string;
}

export { TSchedule, TScheduleRequest, IScheduleResponse };
