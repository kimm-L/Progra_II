const { Usuario, Grupo } = require('../models');
const bcrypt = require('bcryptjs');

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'login', 'grupoId'],
      include: {
        model: Grupo,
        as: 'grupo',
        attributes: ['id', 'nombre']
      },
      order: [['id', 'ASC']]
    });

    const data = usuarios.map(usuario => ({
      id: usuario.id,
      login: usuario.login,
      grupoId: usuario.grupoId,
      grupo: usuario.grupo ? usuario.grupo.nombre : null
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los usuarios', error: error.message });
  }
};

exports.crearUsuario = async (req, res) => {
  try {
    const { login, password, grupoId } = req.body;

    if (!login || !login.trim()) {
      return res.status(400).json({ mensaje: 'El login es obligatorio' });
    }

    if (!password || !password.trim()) {
      return res.status(400).json({ mensaje: 'La contraseña es obligatoria' });
    }

    if (!grupoId) {
      return res.status(400).json({ mensaje: 'El grupo es obligatorio' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const nuevoUsuario = await Usuario.create({
      login: login.trim(),
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

exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { login, password, grupoId } = req.body;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.login = login;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(password, salt);
    }
    usuario.grupoId = grupoId;

    await usuario.save();

    res.json({ mensaje: 'Usuario actualizado correctamente', usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el usuario', error: error.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await usuario.destroy();

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario', error: error.message });
  }
};