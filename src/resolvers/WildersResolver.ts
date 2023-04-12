import { Arg, Mutation, Query } from "type-graphql";
import dataSource from "../dataSource";
import Wilder from "../entities/Wilder";

export class WildersResolver {
  @Query(() => [Wilder])
  async getAllWilders(): Promise<Wilder[]> {
    const wilders = await dataSource.manager.find(Wilder, {
      relations: { skills: true },
    });
    return wilders;
  }

  @Mutation(() => Wilder)
  async addWilder(
    @Arg("name") name: string,
    @Arg("city") city: string
  ): Promise<Wilder> {
    const wilderToCreate = new Wilder();
    wilderToCreate.name = name;
    wilderToCreate.city = city;
    return await dataSource.manager.save(Wilder, wilderToCreate);
  }
}
