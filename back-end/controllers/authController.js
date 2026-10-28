const { Usuario, Grupo, Permiso } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

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

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

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
        grupo: usuario.grupo ? usuario.grupo.nombre : null,
        permisos: usuario.grupo && usuario.grupo.permisos ? usuario.grupo.permisos.map(p => p.nombre) : []
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};