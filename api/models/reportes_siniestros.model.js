'use strict';

const mongoose = require('mongoose');

const schema_reportes_siniestros = new mongoose.Schema({
    usuario_identificacion: { type: String, require: true, unique: false },
    tipo_siniestro: { type: String, require: true, unique: false },
    descripcion: { type: String, require: true, unique: false },
    ruta_id: { type: String, require: true, unique: false },
    latitud: { type: String, require: true, unique: false },
    longitud: { type: String, require: true, unique: false }
});

module.exports = mongoose.model('reporteSiniestro', schema_reportes_siniestros, 'reportes_siniestros');