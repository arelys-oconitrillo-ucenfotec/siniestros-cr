'use strict';

const mongoose = require('mongoose');

const schema_rutas = new mongoose.Schema({
   nombre_ruta: { type: String, required: true, unique: true },
   latitud_inicio: { type: String, required: true, unique: true },
   longitud_inicio: { type: String, required: true, unique: true },
   latitud_fin: { type: String, required: true, unique: true },
   longitud_fin: { type: String, required: true, unique: true }
   
});

module.exports = mongoose.model('ruta', schema_rutas, 'rutas');