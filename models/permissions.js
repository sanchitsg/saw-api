'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // define association here
    // }
  }
  permissions.init(
    {
      name: DataTypes.STRING,
      icon: DataTypes.STRING(50),
      redirect_url: DataTypes.STRING(300),
    },
    {
      sequelize,
      modelName: 'permissions',
    },
  );
  return permissions;
};
