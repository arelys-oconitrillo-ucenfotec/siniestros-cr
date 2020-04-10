'use strict';

const mongoose = require('mongoose');

const schema_vehiculo_caracteristicas = new mongoose.Schema({
   caracteristica: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('vehiculoCaracteristicas', schema_vehiculo_caracteristicas, 'vehiculos_caracteristicas');