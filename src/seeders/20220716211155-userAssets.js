module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'User_Assets',
      [{
        user_id: 1,
        asset_id: 1,
        asset_name: 'AAPL - Apple',
        purchase_price: 85.69,
      },
      {
        user_id: 1,
        asset_id: 2,
        asset_name: 'MGLU3 - Magazine Luiza',
        purchase_price: 2.22,
      },
      {
        user_id: 4,
        asset_id: 4,
        asset_name: 'PETR4 - Petrobras',
        purchase_price: 28.96,
      },
      {
        user_id: 3,
        asset_id: 2,
        asset_name: 'MGLU3 - Magazine Luiza',
        purchase_price: 3,
      },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('User_Assets', null, {});
  },
};
