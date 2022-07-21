module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'User_Assets',
      [{
        user_id: 1,
        asset_id: 1,
        quantity: 2,
      },
      {
        user_id: 1,
        asset_id: 2,
        quantity: 2,
      },
      {
        user_id: 4,
        asset_id: 4,
        quantity: 5,
      },
      {
        user_id: 3,
        asset_id: 2,
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
