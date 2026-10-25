const { Grupo } = require('../models');

exports.obtenerGrupos = async (req, res) => {
  try {
    const grupos = await Grupo.findAll({
      order: [['id', 'ASC']]
    });
    res.json(grupos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los grupos', error: error.message });
  }
};

exports.crearGrupo = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ mensaje: 'El nombre del grupo es obligatorio' });
    }

    const grupo = await Grupo.create({ nombre: nombre.trim() });

    res.status(201).json({
      mensaje: 'Grupo creado exitosamente',
      grupo
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el grupo', error: error.message });
  }
};

exports.actualizarGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const grupo = await Grupo.findByPk(id);

    if (!grupo) {
      return res.status(404).json({ mensaje: 'Grupo no encontrado' });
    }

    grupo.nombre = nombre;
    await grupo.save();

    res.json({ mensaje: 'Grupo actualizado', grupo });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el grupo', error: error.message });
  }
};

exports.eliminarGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const grupo = await Grupo.findByPk(id);

    if (!grupo) {
      return res.status(404).json({ mensaje: 'Grupo no encontrado' });
    }

    await grupo.destroy();
    res.json({ mensaje: 'Grupo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el grupo', error: error.message });
  }
};