const { Cliente } = require('../models');

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los clientes', error: error.message });
  }
};

// Crear un nuevo cliente
exports.crearCliente = async (req, res) => {
  try {
    const { nit, nombre, direccion, telefono, email } = req.body;

    const nuevoCliente = await Cliente.create({
      nit,
      nombre,
      direccion,
      telefono,
      email
    });

    res.status(201).json({
      mensaje: 'Cliente creado exitosamente',
      cliente: nuevoCliente
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el cliente', error: error.message });
  }
};