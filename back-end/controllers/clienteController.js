const { Cliente } = require('../models');

exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      attributes: ['id', 'nombre', 'direccion', 'telefono', 'email'],
      order: [['id', 'ASC']]
    });

    res.json(clientes);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los clientes',
      error: error.message
    });
  }
};

exports.crearCliente = async (req, res) => {
  try {
    const { nombre, direccion, telefono, email } = req.body;

    if (!nombre || !direccion || !telefono || !email) {
      return res.status(400).json({
        mensaje: 'nombre, direccion, telefono y email son obligatorios'
      });
    }

    const cliente = await Cliente.create({
      nombre,
      direccion,
      telefono,
      email
    });

    res.status(201).json({
      mensaje: 'Cliente creado exitosamente',
      cliente
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear el cliente',
      error: error.message
    });
  }
};

exports.actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono, email } = req.body;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    cliente.nombre = nombre;
    cliente.direccion = direccion;
    cliente.telefono = telefono;
    cliente.email = email;

    await cliente.save();

    res.json({
      mensaje: 'Cliente actualizado correctamente',
      cliente
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar el cliente',
      error: error.message
    });
  }
};

exports.eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    await cliente.destroy();

    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar el cliente',
      error: error.message
    });
  }
};