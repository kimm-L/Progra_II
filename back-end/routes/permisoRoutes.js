const express = require('express');
const router = express.Router();
const permisoController = require('../controllers/permisoController');

router.get('/', permisoController.obtenerPermisos);
router.post('/', permisoController.crearPermiso);
router.put('/:id', permisoController.actualizarPermiso);
router.delete('/:id', permisoController.eliminarPermiso);

module.exports = router;