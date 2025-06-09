const mongoose = require('mongoose'); 

const zonaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  coordenadas: {
    type: [[[Number]]], // [ [ [lat, lng], ... ] ]
    required: true
  },
  color: { type: String, } // ✅ AGREGADO
});

module.exports = mongoose.model('Zona', zonaSchema);
