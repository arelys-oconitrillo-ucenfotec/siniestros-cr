'use strict';

const mongoose = require('mongoose');

const schema_incidentes = new mongoose.Schema({
   nombre_siniestro: { type: String, required: true, unique: true },
   icono: { type:}
});

module.exports = mongoose.model('Incidente', schema_incidente, 'incidentes');