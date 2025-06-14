const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const clienteController = require('../controllers/clienteController');

// Página principal (mapa)
router.get('/', clienteController.mostrarMapa);

// Login
router.get('/login', authController.loginPage);
router.post('/login', authController.loginBtn);

// Formulario cliente
router.get('/nuevo', clienteController.mostrarFormulario);
router.post('/nuevo', express.urlencoded({ extended: true }), clienteController.agregarCliente);

// API clientes
router.get('/api/clientes', clienteController.obtenerClientes);

// API zonas
router.post('/api/zonas', clienteController.guardarZona);
router.get('/api/zonas', clienteController.obtenerZonas);
router.delete('/api/zonas/:id', clienteController.eliminarZona);

module.exports = router;
