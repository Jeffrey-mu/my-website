const { DataTypes } = require("sequelize");
const sequelize = require("../db");

/**
 * 事件模型
 */
const TodoModel = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    create_date: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "todo",
    paranoid: true,
    deletedAt: "isDelete",
    timestamps: false,
  }
);

module.exports = TodoModel;
