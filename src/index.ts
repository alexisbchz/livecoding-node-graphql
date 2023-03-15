import express from "express";
import cors from "cors";
import dataSource from "./dataSource";
import wildersRouter from "./routers/wildersRouter";
import skillsRouter from "./routers/skillsRouter";

const app = express();
app.use(express.json());
app.use(cors());
app.use(wildersRouter);
app.use(skillsRouter);

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const port = 5000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
  });
};
void start();
