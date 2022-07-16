module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'User_Assets',
      [{
        user_id: 1,
        asset_id: 1,
        purchase_price: 85.69,
        quantity: 2,
      },
      {
        user_id: 1,
        asset_id: 2,
        purchase_price: 2.22,
        quantity: 2,
      },
      {
        user_id: 4,
        asset_id: 4,
        purchase_price: 28.96,
        quantity: 5,
      },
      {
        user_id: 3,
        asset_id: 2,
        purchase_price: 3.00,
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
