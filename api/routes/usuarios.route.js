'use strict';

const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios.model');

router.post('/registrar-usuario', (req, res) => {
    let body = req.body;
    let nuevo_usuario = new Usuario({
        tipo_identificacion: body.tipo_identificacion,
        identificacion: body.identificacion,
        primer_nombre: body.primer_nombre,
        segundo_nombre: body.segundo_nombre,
        primer_apellido: body.primer_apellido,
        segundo_apellido: body.segundo_apellido,
        genero: body.genero,
        correo: body.correo,
        telefono: body.telefono,
        fotografia: body.fotografia,
        rol: body.rol,
        codigo_activacion: body.codigo_activacion,
        contrasena: body.contrasena,
        estado: body.estado
    });

    nuevo_usuario.save((err, usuarioDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el usuario, ocurrió el siguiente error:',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                usuarioDB
            });
        }
    });


});

router.get('/listar-usuarios', (req, res) => {
    Usuario.find((err, lista_usuarios) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar los usuarios',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los usuarios se listaron adecuadamente',
                lista_usuarios
            });
        }
    });
});

router.put('/modificar-usuario', function(req, res) {
    let body = req.body;

    Usuario.updateOne({ _id: body._id }, { $set: req.body }, function(error, info){
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el usuario',
                err 
            });
        } else {
            res.json({
                resultado: true,
                info: info
            });
        }
    });
});

module.exports = router;