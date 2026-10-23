'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   static associate(models) {
      // Un usuario pertenece a un grupo
      Usuario.belongsTo(models.Grupo, { foreignKey: 'grupoId', as: 'grupo' });
    }
  }
  Usuario.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    grupoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};