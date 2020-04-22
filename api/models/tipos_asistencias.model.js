'use strict';

const mongoose = require('mongoose');

const schema_tipo_asistencias = new mongoose.Schema({
   nombre_asistencia: { type: String, required: true, unique: true },
   descripcion: { type: String, required: true, unique: true },
   costo: { type: Number, required: false, unique: false }
});

module.exports = mongoose.model('tipoAsistencia', schema_tipo_asistencias, 'tipo_asistencias');