import { DataTypes } from 'sequelize'
import sequelize from '../utils/connect'
/**
 * 资源
 */
const ResourceModel = sequelize.define(
  'resource',
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
    img: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'resource',
    paranoid: true,
    deletedAt: 'isDelete',
    timestamps: false,
  }
)

export default ResourceModel
