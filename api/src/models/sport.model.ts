import { DataTypes, Model } from "sequelize";
import db from "../config";

export interface SportAttributes {
  id: string;
  name: string;
}

const Sport = db.define("sports", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

export default Sport;
