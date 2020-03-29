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
        usuario_especializado: body.usuario_especializado,
        codigo_activacion: body.codigo_activacion,
        contrasena: body.contrasena,
        estado: body.estado
    });

    nuevo_usuario.save((error, usuarioDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el usuario, ocurrió el siguiente error:',
                error
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
    Usuario.find((error, lista_usuarios) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar los usuarios',
                error
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

router.put('/modificar-usuario', function (req, res) {
    let body = req.body;

    Usuario.updateOne({
        _id: body._id
    }, {
        $set: req.body
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el usuario',
                error
            });
        } else {
            res.json({
                resultado: true,
                info: info
            });
        }
    });
});

router.delete('/eliminar-usuario', function (req, res) {
    let body = req.body;

    Usuario.deleteOne({
        _id: body._id
    }).then(resultado => {

        if (resultado.deletedCount == 1) {
            res.json({
                resultado: true,
                msg: 'Se eliminó el usuario'
            });
        } else {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el usuario'
            });
        } //
    });
});

router.put('/agregar-especializado', function (req, res) {
    if (req.body._id) {
        Usuario.updateOne({
            _id: req.body._id
        }, {
            $set: req.body
        }, function (error) {
            if (error) {
                return res.json({
                    resultado: false,
                    msj: 'No se pudo agregar el usuario especializado',
                    error
                });
            } else {
                return res.json({
                    resultado: true,
                    msj: 'Se agregó correctamente el usuario especializado'
                });
            }
        })
    } else {
        return res.json({
            resultado: false,
            msj: 'No se pudo agregar el usuario especializado, por favor verifique que el _id sea correcto'
        });
    }
});

module.exports = router;
