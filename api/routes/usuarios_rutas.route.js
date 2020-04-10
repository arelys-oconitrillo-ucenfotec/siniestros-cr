'use strict';

const express = require('express');
const router = express.Router();
const UsuarioRuta = require('../models/usuarios_rutas.model');

router.post('/registrar/usuario-ruta', (req, res) => {
    let body = req.body;
    let nuevo_usuario_ruta = new UsuarioRuta({
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

    nuevo_usuario_ruta.save((error, usuario_rutaDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el usuario ruta, ocurrió el siguiente error:',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                usuario_rutaDB
            });
        }
    });


});

router.get('/listar/usuarios-rutas', (req, res) => {
    UsuarioRuta.find((error, lista_usuarios_rutas) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar los usuarios rutas',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los usuarios rutas se listaron adecuadamente',
                lista_usuarios_rutas
            });
        }
    });
});

router.put('/modificar/usuario-ruta', function (req, res) {
    let body = req.body;

    UsuarioRuta.updateOne({
        _id: body._id
    }, {
        $set: req.body
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el usuario ruta',
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

router.delete('/eliminar/usuario-ruta', function (req, res) {
    let body = req.body;

    UsuarioRuta.deleteOne({
        _id: body._id
    }).then(resultado => {

        if (resultado.deletedCount == 1) {
            res.json({
                resultado: true,
                msg: 'Se eliminó el usuario ruta'
            });
        } else {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el usuario ruta'
            });
        }
    });
});

router.post('/validar_credenciales', function (req, res) {
    let body = req.body;

    UsuarioRuta.findOne({
        correo: req.body.correo
    }).then(
        function (usuario_ruta) {
            if (usuario_ruta) {
                if (usuario_ruta.contrasena == req.body.contrasena) {
                    res.json({
                        success: true,
                        usuario_ruta: usuario_ruta
                    });
                } else {
                    res.json({
                        success: false,
                        msg: 'Clave incorrecta'
                    });
                }

            } else {
                res.json({
                    success: false,
                    msg: 'Usuario no existe'
                });
            }
        }
    )
});


module.exports = router;
