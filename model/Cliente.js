const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: String,
  lat: Number,
  lng: Number,
  horario: String,         // 🕒 Ej: "08 a 18 hs"
  bultos: { type: Number, default: 0 }, // 📦 Valor por defecto 0
  zona: String             // (opcional)
});

module.exports = mongoose.model('Cliente', clienteSchema);
