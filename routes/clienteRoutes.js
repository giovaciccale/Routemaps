const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Página principal
router.get('/', clienteController.mostrarMapa);

// Mostrar formulario para agregar cliente
router.get('/nuevo', clienteController.mostrarFormulario);

// Guardar nuevo cliente
router.post('/nuevo', express.urlencoded({ extended: true }), clienteController.agregarCliente);

// Obtener lista de clientes (API)
router.get('/api/clientes', clienteController.obtenerClientes);

// Guardar nueva zona dibujada (desde Leaflet)
router.post('/api/zonas', clienteController.guardarZona);

// Obtener zonas guardadas para mostrar en el mapa
router.get('/api/zonas', clienteController.obtenerZonas);

// eLIMINAR zonas guardadas 
router.delete('/api/zonas/:id', clienteController.eliminarZona);

module.exports = router;
