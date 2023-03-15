import { Router } from "express";
import WildersController from "../controllers/WildersController";

// On initialise le routeur
const wildersRouter = Router();

// On initialise le contrôleur
const wildersController = new WildersController();

// On définit les routes
wildersRouter.get("/api/wilders", wildersController.read);
wildersRouter.get("/api/wilders/:id", wildersController.readOne);
wildersRouter.post("/api/wilders", wildersController.create);
wildersRouter.put("/api/wilders/:id", wildersController.update);
wildersRouter.delete("/api/wilders/:id", wildersController.delete);

// On aurait pu ajouter ces routes au niveau du SkillsController.
wildersRouter.post(
  "/api/wilders/:wilderId/skills/:skillId",
  wildersController.addSkillToWilder
);
wildersRouter.delete(
  "/api/wilders/:wilderId/skills/:skillId",
  wildersController.deleteSkillFromWilder
);

// On exporte le routeur
export default wildersRouter;
