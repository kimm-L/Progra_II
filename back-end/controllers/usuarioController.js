const { Usuario, Grupo } = require('../models');
const bcrypt = require('bcryptjs');

// Listar todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['password'] },
      include: {
        model: Grupo,
        as: 'grupo',
        attributes: ['id', 'nombre']
      }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los usuarios', error: error.message });
  }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { login, password, grupoId } = req.body;

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const nuevoUsuario = await Usuario.create({
      login,
      password: passwordHash,
      grupoId
    });

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      usuario: {
        id: nuevoUsuario.id,
        login: nuevoUsuario.login,
        grupoId: nuevoUsuario.grupoId
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el usuario', error: error.message });
  }
};