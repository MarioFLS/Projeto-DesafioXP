module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Wallets',
      [{
        user_id: 1,
        balance: 250,
      },
      {
        user_id: 2,
        balance: 689.96,
      },
      {
        user_id: 3,
        balance: 1200.40,
      },
      {
        user_id: 4,
        balance: 4560.60,
      },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Wallets', null, {});
  },
};
