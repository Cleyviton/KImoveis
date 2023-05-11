import { z } from "zod";
import { loginSchema } from "../schemas/login.schemas";

type TLogin = z.infer<typeof loginSchema>;

export { TLogin };
