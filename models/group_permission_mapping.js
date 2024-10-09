'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group_permission_mapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    // define association here
    // }
  }
  group_permission_mapping.init(
    {
      group_id: DataTypes.INTEGER,
      permission_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'group_permission_mapping',
    },
  );
  return group_permission_mapping;
};
