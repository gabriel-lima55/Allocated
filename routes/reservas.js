const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');


router.post('/', reservaController.create);
router.get('/', reservaController.findAll);
router.get('/:id_reserva', reservaController.findById);
router.put('/:id_reserva' ,reservaController.put);
router.patch('/:id_reserva' ,reservaController.patch);
router.delete('/:id_reserva', reservaController.delete);

module.exports = router;