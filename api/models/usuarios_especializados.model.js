'use strict';

const mongoose = require('mongoose');

const schema_usuario_especializado = new mongoose.Schema({
    tipo_identificacion: { type: String, required: true, unique: false },
    identificacion: { type: String, required: true, unique: true },
    razon_social: { type: String, required: false, unique: false },
    nombre_comercial: { type: String, required: false, unique: false },
    info_aponderado: { type: String, required: false, unique: false },
    primer_nombre: { type: String, required: true, unique: false },
    segundo_nombre: { type: String, required: false, unique: false },
    primer_apellido: { type: String, required: true, unique: false },
    segundo_apellido: { type: String, required: false, unique: false },
    genero: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: true },
    telefono: { type: Number, required: true, unique: false },
    fotografia: { type: String, required: true, unique: false },
    tipo: { type: String, required: true, unique: false },
    provincia: { type: String, required: true, unique: false },
    canton: { type: String, required: true, unique: false },
    distrito: { type: String, required: true, unique: false },
    otras_senas: { type: String, required: true, unique: false },
    codigo_activacion: { type: String, required: true, unique: false },
    contrasena: { type: String, required: true, unique: false },
    estado: { type: String, required: true, unique: false }
});

module.exports = mongoose.model('usuario_especializado', schema_usuario_especializado, 'usuarios_especializados');