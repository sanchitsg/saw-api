'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('permissions', [
      {
        name: 'Dashboard',
        icon: 'clipboard-list',
        redirect_url: 'localhost:8090/dashboard',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Super Admin',
        icon: 'skull-crossbones',
        redirect_url: 'localhost:8090/super-admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('permissions', null, {});
  },
};
