'use strict';

const mongoose = require('mongoose');

const schema_vehiculo = new mongoose.Schema({
    numeroPlaca: {
        type: String,
        required: true,
        unique: true
    },
    marca: {
        type: String,
        required: true,
        unique: false
    },
    modelo: {
        type: String,
        required: true,
        unique: false
    },
    annoModelo: {
        type: Number,
        required: true,
        unique: false
    },
    color: { 
        type: String,
        required: true,
        unique: false
    },
    caracteristicas: [
        {
            vehiculo_caracteristica_id: {type: String, required: true, unique: true},
            vehiculo_caracteristica: {type: String, required: true, unique: true}
        }
    ]
});

module.exports = mongoose.model('vehiculo', schema_vehiculo, 'vehiculos');
