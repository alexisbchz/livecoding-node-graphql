import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Wilder from "./Wilder";

@Entity()
export default class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Wilder, (wilder) => wilder.skills)
  wilders: Wilder[];
}
