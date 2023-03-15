import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Skill from "./Skill";

@Entity()
export default class Wilder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @ManyToMany(() => Skill, (skill) => skill.wilders, { eager: true })
  @JoinTable()
  skills: Skill[];
}

/* On aurait pu ici ajouter le repository de Wilder,
   mais on a décidé de le faire dans les contrôleurs.

import { EntityRepository, Repository } from "typeorm";
import Wilder from "../entities/Wilder";

@EntityRepository(Wilder)
export class WildersRepository extends Repository<Wilder> {}
*/
