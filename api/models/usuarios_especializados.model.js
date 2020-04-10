'use strict';

const mongoose = require('mongoose');

const schema_usuario_especializado = new mongoose.Schema({
    tipo_identificacion: { type: String, required: true, unique: false },
    identificacion: { type: String, required: true, unique: true },
    primer_nombre: { type: String, required: true, unique: false },
    segundo_nombre: { type: String, required: false, unique: false },
    primer_apellido: { type: String, required: true, unique: false },
    segundo_apellido: { type: String, required: false, unique: false },
    genero: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: true },
    telefono: { type: Number, required: true, unique: false },
    fotografia: { type: String, required: true, unique: false },
    usuario_especializado: { 
        tipo: { type: String, required: false, unique: false },
        direccion: {
            provincia: { type: String, required: false, unique: false },
            canton: { type: String, required: false, unique: false },
            distrito: { type: String, required: false, unique: false },
            otras_senas: { type: String, required: false, unique: false }
        } 
    },
    codigo_activacion: { type: String, required: true, unique: false },
    contrasena: { type: String, required: true, unique: false },
    estado: { type: String, required: true, unique: false }
});

module.exports = mongoose.model('usuario_especializado', schema_usuario_especializado, 'usuarios_especializados');