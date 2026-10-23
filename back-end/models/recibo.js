'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recibo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  Recibo.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
}
  }
  Recibo.init({
    clienteId: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    descripcion: DataTypes.STRING,
    total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Recibo',
  });
  return Recibo;
};