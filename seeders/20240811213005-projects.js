'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('projects', [
      {
        title: 'The Sous Chef',
        description:
          'Your day to day Kitchen Assistant. Maintain recipes, create shopping list for daily or weekly cooking and even explore new dishes made by other home chefs to ignite the Chef in you.',
        redirect_url: 'localhost:9000',
        image_url: 'localhost:9000/img/project_main.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Project One',
        description: 'Some random description for Project One',
        redirect_url: 'localhost:9001',
        image_url: 'localhost:9001/img/project_main.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('projects', null, {});
  },
};
