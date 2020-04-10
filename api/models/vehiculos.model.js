'use strict';

const mongoose = require('mongoose');

const schema_vehiculo = new mongoose.Schema({
    numeroPlaca: {
        type: Number,
        required: true,
        unique: true
    },
    tipoVehiculo: {
        type: String,
        required: true,
        unique: false
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
        type: Date,
        required: true,
        unique: false
    },
    extras: [
        {
            detalle: {
                type: String,
                required: true,
                unique: false
            }
        }
    ],
    estado: String,
    caracteristicas: [
        {
            vehiculo_caracteristica_id: {type: String, required: true, unique: true},
            vehiculo_caracteristica: {type: String, required: true, unique: true}
        }
    ]
});

module.exports = mongoose.model('vehiculo', schema_vehiculo, 'vehiculos');
