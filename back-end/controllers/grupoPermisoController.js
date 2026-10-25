const { GrupoPermiso } = require('../models');

exports.obtenerGrupoPermisos = async (req, res) => {
  try {
    const grupoPermisos = await GrupoPermiso.findAll({
      order: [['id', 'ASC']]
    });
    res.json(grupoPermisos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los grupo permisos', error: error.message });
  }
};

exports.crearGrupoPermiso = async (req, res) => {
  try {
    const { grupoId, permisoId } = req.body;

    if (!grupoId || !permisoId) {
      return res.status(400).json({ mensaje: 'grupoId y permisoId son obligatorios' });
    }

    const grupoPermiso = await GrupoPermiso.create({ grupoId, permisoId });

    res.status(201).json({
      mensaje: 'Relación creada exitosamente',
      grupoPermiso
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la relación', error: error.message });
  }
};

exports.actualizarGrupoPermiso = async (req, res) => {
  try {
    const { id } = req.params;
    const { grupoId, permisoId } = req.body;

    const registro = await GrupoPermiso.findByPk(id);

    if (!registro) {
      return res.status(404).json({ mensaje: 'Relación no encontrada' });
    }

    registro.grupoId = grupoId;
    registro.permisoId = permisoId;
    await registro.save();

    res.json({ mensaje: 'Relación actualizada', registro });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la relación', error: error.message });
  }
};

exports.eliminarGrupoPermiso = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await GrupoPermiso.findByPk(id);

    if (!registro) {
      return res.status(404).json({ mensaje: 'Relación no encontrada' });
    }

    await registro.destroy();
    res.json({ mensaje: 'Relación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la relación', error: error.message });
  }
};