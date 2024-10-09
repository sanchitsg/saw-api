'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // define association here
    // }
  }
  projects.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      redirect_url: DataTypes.STRING(300),
      image_url: DataTypes.STRING(300),
    },
    {
      sequelize,
      modelName: 'projects',
    },
  );
  return projects;
};
