'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        first_name: 'Sanchit',
        last_name: 'Singh',
        email: 'sanchit@gmail.com',
        password:
          '$2b$10$p1zDPDc9xTP/hZDm3D7xc.FD92vrmV0Vm12xdz.AlgTqf0vB7JOmq',
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Srishti',
        last_name: 'Mull',
        email: 'srishti@gmail.com',
        password:
          '$2b$10$p1zDPDc9xTP/hZDm3D7xc.FD92vrmV0Vm12xdz.AlgTqf0vB7JOmq',
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
