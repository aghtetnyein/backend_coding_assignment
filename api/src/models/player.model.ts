import { DataTypes, Model } from "sequelize";
import db from "../config";

// import interface
import { IntRange } from "../interface";

interface PlayerAttributes {
  id: string;
  email: string;
  gender: "male" | "female";
  age: number;
  level: IntRange<1, 10>;
}
export class PlayerInstance extends Model<PlayerAttributes> {}

const Player = db.define("players", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
    },
  },
  gender: { allowNull: false, type: DataTypes.STRING },
  age: {
    type: DataTypes.INTEGER,
  },
  level: {
    type: DataTypes.INTEGER,
  },
});

export default Player;
