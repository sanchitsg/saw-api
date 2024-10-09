'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_group_mapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // define association here
    // }
  }
  user_group_mapping.init(
    {
      user_id: DataTypes.INTEGER,
      group_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user_group_mapping',
    },
  );
  return user_group_mapping;
};
