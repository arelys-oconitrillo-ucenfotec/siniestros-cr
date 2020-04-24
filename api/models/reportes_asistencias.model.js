'use strict';

const mongoose = require('mongoose');

const schema_reportes_asistencias = new mongoose.Schema({
    usuario_identificacion: { type: String, required: true, unique: false },
    tipo_asistencia: { type: String, required: true, unique: false },
    provincia: { type: String, required: true, unique: false },
    canton: { type: String, required: true, unique: false },
    distrito: { type: String, required: true, unique: false },
    otras_senas: { type: String, required: true, unique: false }
});

module.exports = mongoose.model('reporteAsistencia', schema_reportes_asistencias, 'reportes_asistencias');