const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/', usuarioController.create);
router.post('/login', usuarioController.login);
router.get('/', usuarioController.findAll);
router.put('/:matricula', usuarioController.put);
router.patch('/:matricula', usuarioController.patch);
router.delete('/:matricula', usuarioController.delete);

module.exports = router;