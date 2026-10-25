const { Recibo } = require('../models');

exports.obtenerRecibos = async (req, res) => {
  try {
    const recibos = await Recibo.findAll({
      order: [['id', 'ASC']]
    });
    res.json(recibos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los recibos', error: error.message });
  }
};

exports.crearRecibo = async (req, res) => {
  try {
    const { clienteId, fecha, descripcion, total } = req.body;

    if (!clienteId || !fecha || !descripcion || !total) {
      return res.status(400).json({ mensaje: 'clienteId, fecha, descripcion y total son obligatorios' });
    }

    const recibo = await Recibo.create({
      clienteId,
      fecha,
      descripcion,
      total
    });

    res.status(201).json({
      mensaje: 'Recibo creado exitosamente',
      recibo
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el recibo', error: error.message });
  }
};

exports.actualizarRecibo = async (req, res) => {
  try {
    const { id } = req.params;
    const { clienteId, fecha, descripcion, total } = req.body;

    const recibo = await Recibo.findByPk(id);

    if (!recibo) {
      return res.status(404).json({ mensaje: 'Recibo no encontrado' });
    }

    recibo.clienteId = clienteId;
    recibo.fecha = fecha;
    recibo.descripcion = descripcion;
    recibo.total = total;

    await recibo.save();

    res.json({ mensaje: 'Recibo actualizado', recibo });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el recibo', error: error.message });
  }
};

exports.eliminarRecibo = async (req, res) => {
  try {
    const { id } = req.params;
    const recibo = await Recibo.findByPk(id);

    if (!recibo) {
      return res.status(404).json({ mensaje: 'Recibo no encontrado' });
    }

    await recibo.destroy();
    res.json({ mensaje: 'Recibo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el recibo', error: error.message });
  }
};