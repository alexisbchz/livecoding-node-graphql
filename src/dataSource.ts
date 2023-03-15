import { DataSource } from "typeorm";
import Skill from "./entities/Skill";
import Wilder from "./entities/Wilder";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder, Skill],
});

export default dataSource;
