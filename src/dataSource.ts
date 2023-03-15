import { DataSource } from "typeorm";
import Skill from "./entities/Skill";
import Wilder from "./entities/Wilder";

// On définit la source de données
const dataSource = new DataSource({
  // On utilise SQLite, mais on pourrait utiliser MySQL, PostgreSQL, etc.
  type: "sqlite",
  // On définit le chemin vers la base de données.
  // Ici, on utilise une base de données SQLite nommée wildersdb.sqlite.
  database: "./wildersdb.sqlite",
  // On synchronise la base de données avec les entités
  synchronize: true,
  // On définit les entités
  entities: [Wilder, Skill],
});

// On exporte la source de données
export default dataSource;
