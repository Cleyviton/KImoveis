import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TLogin } from "../../interfaces/login.interface";
import { AppError } from "../../error";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createLoginService = async (loginData: TLogin): Promise<string> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOneBy({
    email: loginData.email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const verifyPassword = compareSync(loginData.password, user.password);

  if (!verifyPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      adminPermission: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1d",
      subject: String(user.id),
    }
  );

  return token;
};

export default createLoginService;
