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
