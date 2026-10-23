const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models'); 
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes'); //rutas de clientes

const app = express();
const PORT = process.env.PORT || 8010;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/clientes', clienteRoutes); // rutas de clientes

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '¡API del sistema de usuarios funcionando al 100%!' });
});

// Levantar servidor y probar conexión a la BD
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
});