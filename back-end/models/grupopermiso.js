'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrupoPermiso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  GrupoPermiso.belongsTo(models.Grupo, { foreignKey: 'grupoId', as: 'grupo' });
  GrupoPermiso.belongsTo(models.Permiso, { foreignKey: 'permisoId', as: 'permiso' });
}
  }
  GrupoPermiso.init({
    grupoId: DataTypes.INTEGER,
    permisoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GrupoPermiso',
  });
  return GrupoPermiso;
};