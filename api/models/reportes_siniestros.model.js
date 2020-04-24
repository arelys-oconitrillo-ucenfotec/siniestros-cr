'use strict';

const mongoose = require('mongoose');

const schema_reportes_siniestros = new mongoose.Schema({
    usuario_identificacion: { type: String, required: true, unique: false },
    tipo_siniestro: { type: String, required: true, unique: false },
    descripcion: { type: String, required: true, unique: false },
    ruta_id: { type: String, required: true, unique: false },
    latitud: { type: String, required: true, unique: false },
    longitud: { type: String, required: true, unique: false }
});

module.exports = mongoose.model('reporteSiniestro', schema_reportes_siniestros, 'reportes_siniestros');