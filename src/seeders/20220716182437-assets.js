module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Assets',
      [{
        id: 1,
        name: 'AAPL - Apple',
        amount: 653,
        price: 80.58,
      },
      {
        id: 2,
        name: 'MGLU3 - Magazine Luiza',
        amount: 500,
        price: 2.89,
      },
      {
        id: 3,
        name: 'NASDAQ - XP',
        amount: 365,
        price: 94.96,
      },
      {
        id: 4,
        name: 'PETR4 - Petrobras',
        amount: 984,
        price: 27.96,
      },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Assets', null, {});
  },
};
