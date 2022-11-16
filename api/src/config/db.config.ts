import dotenv from "dotenv";
import { Dialect } from "sequelize";

dotenv.config();

export default {
  MYSQL_HOST: process.env.MYSQL_HOST as string,
  MYSQL_USER: process.env.MYSQL_USER as string,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD as string,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE as string,
  dialect: "mysql" as Dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
