'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('group_permission_mappings', [
      {
        group_id: 1,
        permission_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        group_id: 1,
        permission_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        group_id: 2,
        permission_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('group_permission_mappings', null, {});
  },
};
