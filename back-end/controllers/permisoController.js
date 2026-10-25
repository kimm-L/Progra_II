const { Permiso } = require('../models');

exports.obtenerPermisos = async (req, res) => {
  try {
    const permisos = await Permiso.findAll({
      order: [['id', 'ASC']]
    });
    res.json(permisos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los permisos', error: error.message });
  }
};

exports.crearPermiso = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ mensaje: 'El nombre del permiso es obligatorio' });
    }

    const permiso = await Permiso.create({ nombre: nombre.trim() });

    res.status(201).json({
      mensaje: 'Permiso creado exitosamente',
      permiso
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el permiso', error: error.message });
  }
};

exports.actualizarPermiso = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const permiso = await Permiso.findByPk(id);

    if (!permiso) {
      return res.status(404).json({ mensaje: 'Permiso no encontrado' });
    }

    permiso.nombre = nombre;
    await permiso.save();

    res.json({ mensaje: 'Permiso actualizado', permiso });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el permiso', error: error.message });
  }
};

exports.eliminarPermiso = async (req, res) => {
  try {
    const { id } = req.params;
    const permiso = await Permiso.findByPk(id);

    if (!permiso) {
      return res.status(404).json({ mensaje: 'Permiso no encontrado' });
    }

    await permiso.destroy();
    res.json({ mensaje: 'Permiso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el permiso', error: error.message });
  }
};