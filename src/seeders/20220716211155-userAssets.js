module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'User_Assets',
      [{
        user_id: 1,
        asset_id: 1,
        amount: 85.69,
        quantity: 2,
      },
      {
        user_id: 1,
        asset_id: 2,
        amount: 2.22,
        quantity: 2,
      },
      {
        user_id: 4,
        asset_id: 4,
        amount: 28.96,
        quantity: 5,
      },
      {
        user_id: 3,
        asset_id: 2,
        amount: 3.00,
        quantity: 7,
      },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('User_Assets', null, {});
  },
};
