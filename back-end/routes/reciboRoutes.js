const express = require('express');
const router = express.Router();
const reciboController = require('../controllers/reciboController');

router.get('/', reciboController.obtenerRecibos);
router.post('/', reciboController.crearRecibo);
router.put('/:id', reciboController.actualizarRecibo);
router.delete('/:id', reciboController.eliminarRecibo);

module.exports = router;