import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Wilder from "./Wilder";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export default class Skill {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [Wilder])
  @ManyToMany(() => Wilder, (wilder) => wilder.skills)
  wilders: Wilder[];
}
