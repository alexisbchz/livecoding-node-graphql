import { Request, Response } from "express";
import dataSource from "../dataSource";
import Wilder from "../entities/Wilder";

const wildersRepository = dataSource.getRepository(Wilder);

export default class WildersController {
  async create(req: Request, res: Response): Promise<void> {
    // 1. Récupérer les champs permettant de créer un Wilder.
    const { name, city } = req.body;

    // 2. Insérer le Wilder en BDD.
    await wildersRepository.save({
      name,
      city,
    });

    // 3. Retourner un message de succès, avec le bon code HTTP (201 Created)
    res.status(201).send("Wilder created");
  }

  async read(req: Request, res: Response): Promise<void> {
    const wilders = await wildersRepository.find();

    res.send(wilders);
  }

  async update(req: Request, res: Response): Promise<void> {
    // req.params.id = "123"
    // 1. parseInt vérifie que le contenu ressemble à un nombre
    // 2. parseInt vérifie que le contenu ressemble à un entier
    // 3. parseInt convertit la chaîne de caractères en nombre (si 1. et 2. sont vérifiés)
    // parseInt(req.params.id) === 123 !== "123"
    const id = parseInt(req.params.id);

    const wilderToUpdate = await wildersRepository.findOneBy({ id });
    if (wilderToUpdate === null) {
      // Retourner une erreur 404
      res.status(404).send("Wilder to update not found");
      return;
    }

    // Mettre à jour mon Wilder...
    console.log(wilderToUpdate);
  }
}
