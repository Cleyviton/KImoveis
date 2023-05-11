import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().max(45),
  password: z.string().max(120),
});

export { loginSchema };
