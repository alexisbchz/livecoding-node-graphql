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
    const skill = await this.findOneById(id);
    if (skill === null) {
      res.status(404).send("Skill not found");
      return;
    }
    res.send(skill);
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("Invalid ID");
      return;
    }

    const skillToUpdate = await this.findOneById(id);
    if (skillToUpdate === null) {
      res.status(404).send("Skill to update not found");
      return;
    }

    const { name } = req.body;
    try {
      await this.skillsRepository.save({
        id,
        name,
      });
      res.status(200).send("Skill updated");
    } catch (error) {
      if ((error as { code: string }).code === "ER_DUP_ENTRY") {
        res.status(409).send("Skill already exists");
      }
      res.status(500).send("Internal server error");
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("Invalid ID");
      return;
    }

    const skillToDelete = await this.findOneById(id);
    if (skillToDelete === null) {
      res.status(404).send("Skill to delete not found");
      return;
    }

    await this.skillsRepository.delete({ id });
    res.status(200).send("Skill deleted");
  }
}
