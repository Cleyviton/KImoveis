import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleErros } from "./error";
import userRoutes from "./routes/users.routes";
import loginRoutes from "./routes/login.route";
import categoriesRoutes from "./routes/categories.route";
import realEstateRoutes from "./routes/realEstate.route";
import scheduleRoutes from "./routes/schedule.route";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/schedules", scheduleRoutes);

app.use(handleErros);

export default app;
