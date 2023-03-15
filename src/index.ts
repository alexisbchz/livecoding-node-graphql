import express from "express";
import cors from "cors";
import dataSource from "./dataSource";
import WildersController from "./controllers/WildersController";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const wildersController = new WildersController();
app.get("/api/wilders", wildersController.read);
app.post("/api/wilders", wildersController.create);
app.put("/api/wilders/:id", wildersController.update);

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const port = 5000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
  });
};
void start();
