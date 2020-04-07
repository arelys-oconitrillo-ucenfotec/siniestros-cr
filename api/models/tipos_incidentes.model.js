'use strict';

const mongoose = require('mongoose');

const schema_incidentes = new mongoose.Schema({
   nombre_siniestro: { type: String, required: true, unique: true },
   icono: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('tipoIncidente', schema_incidente, 'tipo_incidentes');