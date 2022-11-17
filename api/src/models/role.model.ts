import { DataTypes, Model } from "sequelize";
import db from "../config";
interface RoleAttributes {
  id: string;
  title: string;
  completed: boolean;
}
export class TodoInstance extends Model<RoleAttributes> {}

const Role = db.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

export default Role;
