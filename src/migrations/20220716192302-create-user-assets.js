module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Assets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
        field: 'user_id',
      },
      assetId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Assets',
          key: 'id',
        },
        field: 'asset_id',
      },
      assetName: {
        type: Sequelize.STRING,
        field: 'asset_name',
      },
      purchasePrice: {
        type: Sequelize.DECIMAL(10, 2),
        field: 'purchase_price',
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('User_Assets');
  },
};
