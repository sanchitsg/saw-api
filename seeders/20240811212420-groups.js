'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('groups', [
      {
        name: 'super admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'guest',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('groups', null, {});
  },
};
