const { Usuario, Grupo, Permiso } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    // Buscar usuario por su login e incluir su grupo y permisos
    const usuario = await Usuario.findOne({
      where: { login },
      include: {
        model: Grupo,
        as: 'grupo',
        include: {
          model: Permiso,
          as: 'permisos'
        }
      }
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Validar contraseña temporalmente sin bcrypt
    if (password !== usuario.password) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar el token JWT usando la clave del .env
    const token = jwt.sign(
      { id: usuario.id, login: usuario.login, grupoId: usuario.grupoId },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        login: usuario.login,
        grupo: usuario.grupo.nombre,
        permisos: usuario.grupo.permisos.map(p => p.nombre)
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};