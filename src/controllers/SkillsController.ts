import dataSource from "../dataSource";
import Skill from "../entities/Skill";
import { Request, Response } from "express";

export default class SkillsController {
  private readonly skillsRepository = dataSource.getRepository(Skill);

  constructor() {
    // On aurait aussi pu binder les méthodes
    // dans le routeur.
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.readOne = this.readOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // On extrait la logique de récupération d'un Skill
  private async findOneById(id: number): Promise<Skill | null> {
    return await this.skillsRepository.findOneBy({ id });
  }

  async create(req: Request, res: Response): Promise<void> {
    const { name } = req.body;

    try {
      await this.skillsRepository.save({
        name,
      });
      res.status(201).send("Skill created");
    } catch (error) {
      if ((error as { code: string }).code === "SQLITE_CONSTRAINT") {
        res.status(409).send("Skill already exists");
      }
      res.status(500).send("Internal server error");
    }
  }

  async read(req: Request, res: Response): Promise<void> {
    const skills = await this.skillsRepository.find();
    res.send(skills);
  }

  async readOne(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("Invalid ID");
      return;
    }

    const skill = await this.findOneById(id);
    if (skill === null) {
      res.status(404).send("Skill not found");
      return;
    }
    res.send(skill);
  }

  async update(req: Request, res: Response): Promise<void> {
    // On récupère l'identifiant du Skill à mettre à jour
    const id = parseInt(req.params.id);

    // Si l'identifiant n'est pas un nombre, on retourne une erreur 400
    if (isNaN(id)) {
      res.status(400).send("Invalid ID");
      return;
    }

    // On vérifie que le Skill à mettre à jour existe bien
    const skillToUpdate = await this.findOneById(id);

    // Si le Skill n'existe pas, on retourne une erreur 404
    if (skillToUpdate === null) {
      res.status(404).send("Skill to update not found");
      return;
    }

    // On récupère le nom du Skill à mettre à jour
    const { name } = req.body;

    try {
      // On met à jour le Skill
      await this.skillsRepository.update(skillToUpdate, {
        name,
      });

      // On retourne un message de succès, avec le bon code HTTP (200 OK)
      res.status(200).send("Skill updated");
    } catch (error) {
      // On vérifie que l'erreur est bien une erreur de contrainte d'unicité
      if ((error as { code: string }).code === "SQLITE_CONSTRAINT") {
        res.status(409).send("Skill already exists");
      }

      // On retourne un message d'erreur, avec le bon code HTTP (500 Internal Server Error)
      res.status(500).send("Internal server error");
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    // On récupère l'ID du Skill à supprimer
    const id = parseInt(req.params.id);

    // On vérifie que l'ID est bien un nombre
    if (isNaN(id)) {
      res.status(400).send("Invalid ID");
      return;
    }

    // On récupère le Skill à supprimer
    const skillToDelete = await this.findOneById(id);

    // On vérifie que le Skill existe bien
    if (skillToDelete === null) {
      res.status(404).send("Skill to delete not found");
      return;
    }

    // On supprime le Skill de la BDD
    await this.skillsRepository.delete({ id });

    // On retourne un message de succès, avec le bon code HTTP (200 OK)
    res.status(200).send("Skill deleted");
  }
}
