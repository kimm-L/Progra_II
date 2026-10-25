const express = require('express');
const router = express.Router();
const grupoPermisoController = require('../controllers/grupoPermisoController');

router.get('/', grupoPermisoController.obtenerGrupoPermisos);
router.post('/', grupoPermisoController.crearGrupoPermiso);
router.put('/:id', grupoPermisoController.actualizarGrupoPermiso);
router.delete('/:id', grupoPermisoController.eliminarGrupoPermiso);

module.exports = router;