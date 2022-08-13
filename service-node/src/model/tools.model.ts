import { DataTypes } from 'sequelize'
import sequelize from '../utils/connect'
/**
 * 工具数据模型
 */

const ToolsModel = sequelize.define(
  'Tools',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.INET,
    },
  },
  {
    tableName: 'tools',
    paranoid: true,
    deletedAt: 'isDelete',
    timestamps: false,
  }
)

export default ToolsModel
