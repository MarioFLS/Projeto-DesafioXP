module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [{
        id: 1,
        name: 'Pedro Jorge',
        email: 'pedroJorge@gmail.com',
        password: '123456',
        active: true,
        subscription_date: Sequelize.fn('now'),
      },
      {
        id: 2,
        name: 'Jorge Pedro',
        email: 'jorgePedro@gmail.com',
        password: '6543216',
        active: true,
        subscription_date: Sequelize.fn('now'),
      },
      {
        id: 3,
        name: 'Monkey D. Luffy',
        email: 'luffy@gmail.com',
        password: 'senha',
        active: false,
        subscription_date: Sequelize.fn('now'),
      },
      {
        name: 'Bojji',
        email: 'bojji@gmail.com',
        password: 'theKing',
        active: true,
        subscription_date: Sequelize.fn('now'),
      },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
