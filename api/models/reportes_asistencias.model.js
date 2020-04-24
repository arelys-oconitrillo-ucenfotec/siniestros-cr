'use strict';

const mongoose = require('mongoose');

const schema_reportes_asistencias = new mongoose.Schema({
    usuario_identificacion: { type: String, require: true, unique: false },
    tipo_asistencia: { type: String, require: true, unique: false },
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false },
    otras_senas: { type: String, required: false, unique: false }
});

module.exports = mongoose.model('reporteAsistencia', schema_reportes_asistencias, 'reportes_asistencias');