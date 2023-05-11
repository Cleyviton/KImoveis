import { Repository } from "typeorm";
import {
  IScheduleResponse,
  TScheduleRequest,
} from "../../interfaces/schedules.interface";
import { RealEstate, Schedule, User } from "../../entities";
import { AppDataSource } from "../../data-source";

const createScheduleServices = async (
  userId: number,
  scheduleData: TScheduleRequest
): Promise<IScheduleResponse> => {
  const { realEstateId, ...newScheduleData } = scheduleData;

  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const schedulesRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const findUser: User | null = await usersRepo.findOneBy({
    id: userId,
  });

  const findRealEstate: RealEstate | null = await realEstateRepo.findOneBy({
    id: realEstateId,
  });

  const newSchedule: Schedule = schedulesRepo.create({
    ...newScheduleData,
    user: findUser!,
    realEstate: findRealEstate!,
  });

  await schedulesRepo.save(newSchedule);

  return { message: "Schedule created" };
};

export default createScheduleServices;
