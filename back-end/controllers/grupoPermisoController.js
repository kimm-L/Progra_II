const { GrupoPermiso } = require('../models');

exports.obtenerGrupoPermisos = async (req, res) => {
  try {
    const grupoPermisos = await GrupoPermiso.findAll({
      order: [['id', 'ASC']]
    });

    res.json(grupoPermisos);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los permisos del grupo',
      error: error.message
    });
  }
};

exports.crearGrupoPermiso = async (req, res) => {
  try {
    const { grupoId, permisoId } = req.body;

    if (!grupoId || !permisoId) {
      return res.status(400).json({
        mensaje: 'grupoId y permisoId son obligatorios'
      });
    }

    const relacion = await GrupoPermiso.create({
      grupoId,
      permisoId
    });

    res.status(201).json({
      mensaje: 'Relación creada exitosamente',
      relacion
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear la relación',
      error: error.message
    });
  }
};

exports.actualizarGrupoPermiso = async (req, res) => {
  try {
    const { id } = req.params;
    const { grupoId, permisoId } = req.body;

    const relacion = await GrupoPermiso.findByPk(id);

    if (!relacion) {
      return res.status(404).json({ mensaje: 'Relación no encontrada' });
    }

    relacion.grupoId = grupoId;
    relacion.permisoId = permisoId;

    await relacion.save();

    res.json({
      mensaje: 'Relación actualizada correctamente',
      relacion
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar la relación',
      error: error.message
    });
  }
};

exports.eliminarGrupoPermiso = async (req, res) => {
  try {
    const { id } = req.params;

    const relacion = await GrupoPermiso.findByPk(id);

    if (!relacion) {
      return res.status(404).json({ mensaje: 'Relación no encontrada' });
    }

    await relacion.destroy();

    res.json({ mensaje: 'Relación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar la relación',
      error: error.message
    });
  }
};