'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permiso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  Permiso.belongsToMany(models.Grupo, { 
    through: models.GrupoPermiso, 
    foreignKey: 'permisoId', 
    as: 'grupos' 
  });
}
  }
  Permiso.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permiso',
  });
  return Permiso;
};