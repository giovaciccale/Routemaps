const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Handlebars setup
app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/', clienteRoutes);

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://giovaciccale:45ZgrOpY4dAr8SJR@mycluster-ciccale.tag7jqq.mongodb.net/maps?retryWrites=true&w=majority', {

}).then(() => {
  console.log('✅ Conectado a MongoDB Atlas');
}).catch(err => {
  console.error('❌ Error al conectar MongoDB Atlas:', err.message);
});
