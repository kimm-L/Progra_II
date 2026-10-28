const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const grupoRoutes = require('./routes/grupoRoutes');
const permisoRoutes = require('./routes/permisoRoutes');
const grupoPermisoRoutes = require('./routes/grupoPermisoRoutes');
const reciboRoutes = require('./routes/reciboRoutes');

const app = express();
const PORT = process.env.PORT || 8010;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/grupos', grupoRoutes);
app.use('/api/permisos', permisoRoutes);
app.use('/api/grupo-permisos', grupoPermisoRoutes);
app.use('/api/recibos', reciboRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '¡API del sistema de usuarios funcionando al 100%!' });
});

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
});