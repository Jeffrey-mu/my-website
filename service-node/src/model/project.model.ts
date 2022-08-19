import { DataTypes } from 'sequelize'
import sequelize from '../utils/connect'
/**
 * 我的项目模型
 */
const ProjectModel = sequelize.define(
  'Project',
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
    url: {
      type: DataTypes.STRING,
    },
    githubLink: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },

    img: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'project',
    paranoid: true,
    deletedAt: 'isDelete',
    timestamps: false,
  }
)

export default ProjectModel
