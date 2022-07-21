module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Assets', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      assetId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'asset_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Assets',
          key: 'id',
        },
      },
      quantity: { type: Sequelize.INTEGER },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('User_Assets');
  },
};
