module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Assets', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        field: 'user_id',
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
