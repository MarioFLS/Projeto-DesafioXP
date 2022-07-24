module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      company: {
        type: Sequelize.STRING(100),
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Assets');
  },
};
