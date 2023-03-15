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

// On aurait pu ajouter cette compétence au niveau de la compétence.
wildersRouter.post(
  "/api/wilders/:wilderId/skills/:skillId",
  wildersController.addSkillToWilder
);

// On exporte le routeur
export default wildersRouter;
