const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const userRouter = require('./routes/user'); // Usás este para todo

const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'clave-secreta',
  resave: false,
  saveUninitialized: true
}));

// Motor de vistas
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Usar todas las rutas desde user.js
app.use('/', userRouter);

// Conexión a MongoDB
mongoose.connect('mongodb+srv://giovaciccale:45ZgrOpY4dAr8SJR@mycluster-ciccale.tag7jqq.mongodb.net/maps?retryWrites=true&w=majority')
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(3000, () => {
      console.log('Servidor corriendo en http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar MongoDB Atlas:', err.message);
  });
