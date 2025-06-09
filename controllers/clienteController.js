const axios = require('axios');
const Cliente = require('../model/Cliente');
const Zona = require('../model/zona');
const turf = require('@turf/turf');

// Página principal
exports.mostrarMapa = (req, res) => {
  res.render('home');
};

// Obtener todos los clientes (para mostrar en el mapa)
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

// Formulario para agregar nuevo cliente
exports.mostrarFormulario = (req, res) => {
  res.render('formulario');
};

// Agregar cliente con detección automática de zona
exports.agregarCliente = async (req, res) => {
  const { nombre, direccion, horario, bultos } = req.body;

  try {
    // Geocodificar dirección
    const geoRes = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: direccion,
        key: 'ba5cf5d1a8a447c684560e145576303c',
        language: 'es',
        limit: 1
      }
    });

    const { lat, lng } = geoRes.data.results[0].geometry;

    // Obtener zonas desde MongoDB
    const zonas = await Zona.find();
    let zonaCliente = 'Sin zona';

    // Detectar a qué zona pertenece usando turf
    for (let zona of zonas) {
      const punto = turf.point([lng, lat]); // ⚠️ [lng, lat] para turf
      let anillo = zona.coordenadas[0];

// Asegurarse de que el anillo esté cerrado
if (anillo.length > 0 && (anillo[0][0] !== anillo[anillo.length - 1][0] || anillo[0][1] !== anillo[anillo.length - 1][1])) {
  anillo.push(anillo[0]);
}

const poligono = turf.polygon([anillo]);


      if (turf.booleanPointInPolygon(punto, poligono)) {
        zonaCliente = zona.nombre;
        break;
      }
    }

    // Guardar cliente
    const nuevo = new Cliente({
      nombre,
      direccion,
      lat,
      lng,
      horario,
      zona: zonaCliente
    });

    await nuevo.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error al guardar cliente:', err.message);
    res.status(500).send('Error al guardar cliente');
  }
};


// Guardar nueva zona
exports.guardarZona = async (req, res) => {
  const { nombre, coordenadas, color } = req.body;

  try {
    const nuevaZona = new Zona({ nombre, coordenadas, color });
    await nuevaZona.save();
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('❌ Error al guardar zona:', error.message);
    res.status(500).json({ error: 'No se pudo guardar la zona' });
  }
};


// Obtener todas las zonas
exports.obtenerZonas = async (req, res) => {
  try {
    const zonas = await Zona.find();
    res.json(zonas);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las zonas' });
  }
};

// Eliminar zonas
exports.eliminarZona = async (req, res) => {
  try {
    await Zona.findByIdAndDelete(req.params.id);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar zona' });
  }
};
