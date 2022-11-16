import { INTEGER, STRING } from "sequelize";
import db from "../config";

const Role = db.define("roles", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
  },
});

export default Role;
