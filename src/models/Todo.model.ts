import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "todos",
})
export default class Todo extends Model<Todo> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  completed!: boolean;
}
