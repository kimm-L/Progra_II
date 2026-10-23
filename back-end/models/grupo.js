'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grupo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  Grupo.hasMany(models.Usuario, { foreignKey: 'grupoId', as: 'usuarios' });
  Grupo.belongsToMany(models.Permiso, { 
    through: models.GrupoPermiso, 
    foreignKey: 'grupoId', 
    as: 'permisos' 
  });
}
  }
  Grupo.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Grupo',
  });
  return Grupo;
};