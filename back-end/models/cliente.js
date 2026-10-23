'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  static associate(models) {
  Cliente.hasMany(models.Recibo, { foreignKey: 'clienteId', as: 'recibos' });
}
  }
  Cliente.init({
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};