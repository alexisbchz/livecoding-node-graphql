import { Request, Response } from "express";
import dataSource from "../dataSource";
import Skill from "../entities/Skill";
import Wilder from "../entities/Wilder";

export default class WildersController {
  // J'initialise le repository comme propriété de la classe.
  // Cela permet de ne pas le réinitialiser à chaque appel de méthode.
  // Cela permet aussi de ne pas avoir à répéter dataSource.getRepository(Wilder)
  // à chaque fois que je veux utiliser le repository.
  //
  // Le "private" permet de garantir que le repository ne soit pas modifié ou lu
  // depuis l'extérieur de la classe.
  // Voir https://www.typescriptlang.org/docs/handbook/classes.html#public-private-and-protected-modifiers
  //
  // Le "readonly" permet de garantir que le repository ne soit plus modifiable
  // après l'initialisation.
  // Voir https://www.typescriptlang.org/docs/handbook/classes.html#readonly-modifier
  private readonly wildersRepository = dataSource.getRepository(Wilder);

  // Même chose pour le repository de Skill.
  private readonly skillsRepository = dataSource.getRepository(Skill);

  constructor() {
    // J'applique le "bind" sur les méthodes de cette classe.
    // Cela permet de garantir que le "this" dans ces méthodes
    // est bien l'instance de la classe.
    // Voir https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    // et https://stackoverflow.com/a/45763285
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.readOne = this.readOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.addSkillToWilder = this.addSkillToWilder.bind(this);
    this.deleteSkillFromWilder = this.deleteSkillFromWilder.bind(this);
  }

  // Cette méthode est privée car elle n'est utilisée que dans cette classe.
  // Elle n'a pas vocation à être utilisée depuis l'extérieur.
  // Elle est donc déclarée en privée.
  private async findOneById(id: number): Promise<Wilder | null> {
    return await this.wildersRepository.findOneBy({ id });
  }

  async create(req: Request, res: Response): Promise<void> {
    // 1. Récupérer les champs permettant de créer un Wilder.
    const { name, city } = req.body;

    // 2. Insérer le Wilder en BDD.
    await this.wildersRepository.save({
      name,
      city,
    });

    // 3. Retourner un message de succès, avec le bon code HTTP (201 Created)
    res.status(201).send("Wilder created");
  }

  async read(req: Request, res: Response): Promise<void> {
    // Récupérer tous les Wilders de la BDD
    const wilders = await this.wildersRepository.find();

    // Retourner les Wilders, avec le bon code HTTP (200 OK)
    res.send(wilders);
  }

  async readOne(req: Request, res: Response): Promise<void> {
    // Récupérer l'identifiant du Wilder à récupérer
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("Invalid ID");
      return;
    }

    // Vérifier que le Wilder existe bien
    const wilder = await this.findOneById(id);

    if (wilder === null) {
      // Retourner une erreur 404
      res.status(404).send("Wilder not found");
      return;
    }

    // Retourner le Wilder, avec le bon code HTTP (200 OK)
    res.send(wilder);
  }

  async update(req: Request, res: Response): Promise<void> {
    // req.params.id = "123"
    // 1. parseInt vérifie que le contenu ressemble à un nombre
    // 2. parseInt vérifie que le contenu ressemble à un entier
    // 3. parseInt convertit la chaîne de caractères en nombre (si 1. et 2. sont vérifiés)
    // parseInt(req.params.id) === 123 !== "123"
    const id = parseInt(req.params.id);

    // Vérifier que l'identifiant est bien un nombre
    if (isNaN(id)) {
      res.status(400).send("Invalid ID");
      return;
    }

    const wilderToUpdate = await this.findOneById(id);
    if (wilderToUpdate === null) {
      // Retourner une erreur 404
      res.status(404).send("Wilder to update not found");
      return;
    }

    // Mettre à jour mon Wilder...
    try {
      await this.wildersRepository.update(id, req.body);
    } catch (error) {
      res.status(400).send("Invalid data");
      return;
    }

    // Retourner un message de succès, avec le bon code HTTP (200 OK)
    res.send("Wilder updated");
  }

  async delete(req: Request, res: Response): Promise<void> {
    // Récupérer l'identifiant du Wilder à supprimer
    const id = parseInt(req.params.id);

    // Vérifier que l'identifiant est bien un nombre
    if (isNaN(id)) {
      res.status(400).send("Invalid ID");
      return;
    }

    // Vérifier que le Wilder existe bien
    const wilderToDelete = await this.findOneById(id);
    if (wilderToDelete === null) {
      res.status(404).send("Wilder to delete not found");
      return;
    }

    // Supprimer le Wilder de la BDD
    await this.wildersRepository.delete(req.params.id);

    // Retourner un message de succès, avec le bon code HTTP (200 OK)
    res.send("Wilder deleted");
  }

  // On aurait pu ajouter cette compétence au niveau de la compétence.
  async addSkillToWilder(req: Request, res: Response): Promise<void> {
    // Récupérer l'identifiant du Wilder
    const wilderId = parseInt(req.params.wilderId);

    // Vérifier que l'identifiant est bien un nombre
    if (isNaN(wilderId)) {
      res.status(400).send("Invalid wilder ID");
      return;
    }

    // Récupérer l'identifiant de la compétence
    const skillId = parseInt(req.params.skillId);

    // Vérifier que l'identifiant est bien un nombre
    if (isNaN(skillId)) {
      res.status(400).send("Invalid skill ID");
      return;
    }

    // Vérifier que le Wilder existe bien
    const wilder = await this.findOneById(wilderId);

    if (wilder === null) {
      // Retourner une erreur 404 si le Wilder n'existe pas
      res.status(404).send("Wilder not found");
      return;
    }

    // Vérifier que la compétence existe bien
    const skill = await this.skillsRepository.findOneBy({ id: skillId });

    // Retourner une erreur 404 si la compétence n'existe pas
    if (skill === null) {
      res.status(404).send("Skill not found");
      return;
    }

    // Ajouter la compétence au Wilder
    wilder.skills.push(skill);

    // Sauvegarder le Wilder
    await this.wildersRepository.save(wilder);

    // Retourner un message de succès, avec le bon code HTTP (200 OK)
    res.send("Skill added to Wilder");
  }

  async deleteSkillFromWilder(req: Request, res: Response): Promise<void> {
    const wilderId = parseInt(req.params.wilderId);
    const skillId = parseInt(req.params.skillId);

    // Vérifier que l'identifiant du wilder est bien un nombre
    if (isNaN(wilderId)) {
      res.status(400).send("Invalid wilder ID");
      return;
    }

    // Vérifier que l'identifiant du skill est bien un nombre
    if (isNaN(skillId)) {
      res.status(400).send("Invalid skill ID");
      return;
    }

    // Vérifier que le Wilder existe bien, notez qu'on répète beaucoup de code ici !
    const wilder = await this.findOneById(wilderId);
    if (wilder === null) {
      res.status(404).send("Wilder not found");
      return;
    }

    // Vérifier que la compétence existe bien.
    // Notez qu'on répète beaucoup de code ici (aussi) !
    const skill = await this.skillsRepository.findOneBy({ id: skillId });
    if (skill === null) {
      res.status(404).send("Skill not found");
      return;
    }

    // Supprimer la compétence du Wilder
    wilder.skills = wilder.skills.filter((s) => s.id !== skill.id);

    // Sauvegarder le Wilder
    await this.wildersRepository.save(wilder);

    // Retourner un message de succès, avec le bon code HTTP (200 OK)
    res.send("Skill deleted from Wilder");
  }
}
