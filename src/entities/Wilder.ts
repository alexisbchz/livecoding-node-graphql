import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Skill from "./Skill";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export default class Wilder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  city: string;

  @Field(() => [Skill])
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
