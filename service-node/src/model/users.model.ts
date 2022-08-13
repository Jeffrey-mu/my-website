import { DataTypes } from "sequelize";
import sequelize from "../utils/connect";
/**
 * 用户模型
 */
const UserModel = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
    hobby: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INET,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
    paranoid: true,
    deletedAt: "isDelete",
    timestamps: false,
  }
);

export default UserModel;
