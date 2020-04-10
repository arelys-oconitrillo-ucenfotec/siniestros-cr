'use strict';

const express = require('express');
const router = express.Router();
const UsuarioNormal = require('../models/usuarios_normales.model');

router.post('/registrar/usuario-normal', (req, res) => {
    let body = req.body;
    let nuevo_usuario_normal = new UsuarioNormal({
        tipo_identificacion: body.tipo_identificacion,
        identificacion: body.identificacion,
        razon_social: body.razon_social,
        nombre_comercial: body.nombre_comercial,
        info_aponderado: body.info_aponderado,
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

    nuevo_usuario_normal.save((error, usuario_normalDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el usuario normal, ocurrió el siguiente error:',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                usuario_normalDB
            });
        }
    });


});

router.get('/listar/usuarios-normales', (req, res) => {
    UsuarioNormal.find((error, lista_usuarios_normales) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar los usuarios normales',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los usuarios normales se listaron adecuadamente',
                lista_usuarios_normales
            });
        }
    });
});

router.put('/modificar/usuario-normal', function (req, res) {
    let body = req.body;

    UsuarioNormal.updateOne({
        _id: body._id
    }, {
        $set: req.body
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el usuario normal',
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

router.delete('/eliminar/usuario-normal', function (req, res) {
    let body = req.body;

    UsuarioNormal.deleteOne({
        _id: body._id
    }).then(resultado => {

        if (resultado.deletedCount == 1) {
            res.json({
                resultado: true,
                msg: 'Se eliminó el usuario normal'
            });
        } else {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el usuario normal'
            });
        }
    });
});

router.put('/agregar/especializado', function (req, res) {
    if (req.body._id) {
        UsuarioNormal.updateOne({
            _id: req.body._id
        }, {
            $set: req.body
        }, function (error) {
            if (error) {
                return res.json({
                    resultado: false,
                    msj: 'No se pudo agregar el usuario_normal especializado',
                    error
                });
            } else {
                return res.json({
                    resultado: true,
                    msj: 'Se agregó correctamente el usuario_normal especializado'
                });
            }
        })
    } else {
        return res.json({
            resultado: false,
            msj: 'No se pudo agregar el usuario_normal especializado, por favor verifique que el _id sea correcto'
        });
    }
});

router.post('/validar_credenciales', function (req, res) {
    let body = req.body;

    UsuarioNormal.findOne({
        correo: req.body.correo
    }).then(
        function (usuario_normal) {
            if (usuario_normal) {
                if (usuario_normal.contrasena == req.body.contrasena) {
                    res.json({
                        success: true,
                        usuario_normal: usuario_normal
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
