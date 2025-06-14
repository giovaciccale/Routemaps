const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: String,
  lat: Number,
  lng: Number,
  horario: String,
  bultos: { type: Number, default: 0 },
  zona: String,
  color: { type: String, default: '#708090' } // 🎨 Color por defecto: gris
});

module.exports = mongoose.model('Cliente', clienteSchema);
