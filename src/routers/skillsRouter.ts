import { Router } from "express";
import SkillsController from "../controllers/SkillsController";

// On initialise le routeur
const skillsRouter = Router();

// On initialise le contrôleur
const skillsController = new SkillsController();

// On définit les routes
skillsRouter.get("/api/skills", skillsController.read);
skillsRouter.get("/api/skills/:id", skillsController.readOne);
skillsRouter.post("/api/skills", skillsController.create);
skillsRouter.put("/api/skills/:id", skillsController.update);
skillsRouter.delete("/api/skills/:id", skillsController.delete);

// On exporte le routeur
export default skillsRouter;
