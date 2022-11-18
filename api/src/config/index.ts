import dbConfig from "./db.config";
import { Sequelize } from "sequelize";

const db = new Sequelize(
  dbConfig.MYSQL_DATABASE,
  dbConfig.MYSQL_USER,
  dbConfig.MYSQL_PASSWORD,
  {
    host: dbConfig.MYSQL_HOST,
    dialect: dbConfig.dialect,
    logging: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

db.authenticate().then(() => {
  process.env.NODE_ENV !== "test" &&
    console.log("Connection has been established successfully.");
});

export default db;
