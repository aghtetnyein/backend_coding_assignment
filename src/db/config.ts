import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import { Todo } from "../models";

const isTest = process.env.NODE_ENV === "test";

const config = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 3306,
  DB_USER: (process.env.DB_USER as string) || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: (process.env.DB_NAME as string) || "backend_coding_assignment",
  dialect: (process.env.dialect as Dialect) || ("mysql" as Dialect),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const connection = new Sequelize({
  dialect: config.dialect,
  host: config.DB_HOST,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  logging: false,
  models: [Todo],
});

export default connection;
