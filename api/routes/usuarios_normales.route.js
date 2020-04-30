'use strict';

const express = require('express');
const router = express.Router();
const UsuarioNormal = require('../models/usuarios_normales.model');
const mailerPassword = require('../templates/envio-contrasena-mail');
const mailer = require('../templates/envio-contrasena-mail');


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

router.get('/buscar/usuario-normal', function(req,res) {

    let identificacion = req.query.identificacion

    UsuarioNormal.findOne({ identificacion: identificacion }, (error, usuario_normalDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se encontró ningun usuario con esa identificación',
                error
            });
        } else {
            res.json({
                resultado: true,
                usuario_normal: usuario_normalDB
            });
        }
    });
});

router.get('/listar/usuarios-normales', (req, res) => {
    UsuarioNormal.find((error, lista_usuarios_normales) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudieron listar los usuarios normales',
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


/* Inicio--- Agregar, Modificar, Borrar tarjetas de credito del registro del Usuario*/

router.post('/agregar/tarjeta', function(req, res) {
    UsuarioNormal.update({ identificacion: req.body.identificacion }, {
        $push: {
            'tarjetas': {
                tipoTarjeta: req.body.tipoTarjeta,
                numeroTarjeta: req.body.numeroTarjeta,
                fechaExp: req.body.fechaExp,
                codigoCVV: req.body.codigoCVV
            }
        }

    },
    function(error) {
        if (error) {
            return res.json({
                success: false,
                msj: 'No se pudo agregar la tarjeta',
                error
            })
        } else {
            return res.json({
                success: true,
                msj: 'Se agregó correctamente la tarjeta'
            });
        }
        }
    
    )
});

router.get('/listar/tarjeta', (req, res) => {
    UsuarioNormal.find((error, lista_tarjetas) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudo listar la o las tarjetas',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Las Tarjetas se listaron adecuadamente',
                lista_tarjetas
            });
        }
    });
});


/* busqueda de tarjeta, pasando el parémetro  de Identificacion */

router.get('/buscar/tarjeta/:tarjeta', function(req, res) {
    let tarjeta = req.params.tarjetas;
    let identificacion = req.params.identificacion;
/* buscar el usuario completo esto me facilita el poder manipular la informacion del usuario*/
    UsuarioNormal.find ({ identificacion: identificacion,
                    tarjetas: tarjeta }, function(err, lista_tarjetas) {

                if (err) {
                return res.json({
                    success: false,
                    msj: 'No se encontró ninguna tarjeta para ese Usuario',
                    err
                })
            } else {
                return res.json ({
                    success: true,
                    tarjetasC: lista_tarjetas
                });
            }
        })
});

router.delete('/eliminar/tarjeta', function (req, res) {
    let body = req.body;
    let identificacion = body.identificacion;
    
    UsuarioNormal.deleteOne({identificacion: identificacion, tarjetas: body.tarjetas
    }).then(resultado => {

        if (resultado.deletedCount == 1) {
            res.json({
                resultado: true,
                msg: 'Se eliminó la tarjeta'
            });
        } else {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar la tarjeta'
            });
        }
    });
});

router.put('/modificar/tarjeta', function (req, res) {
    let body = req.body;

    UsuarioNormal.updateOne({id: body.p__id, 'tarjetas._id': body.p_tarjetaId }, {
        $set: {
            'tarjetas.$.tipoTarjeta': body.tipoTarjeta,
            'tarjetas.$.numeroTarjeta': body.numeroTarjeta,
            'tarjetas.$.fechaExp': body.fechaExp,
            'tarjetas.$.codigoCVV': body.codigoCVV
        }
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar la tarjeta',
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

/* FIN-----Agregar, Modificar, Borrar tarjetas de credito del registro del Usuario*/

/* --------Generar Contraseña Usuario normal...........*/

router.put('/guardar_contrasena', function (req, res) {
    let body = req.body;

    UsuarioNormal.updateOne({id: body.p__id }, {
        $set: {
            'contrasena': body.contrasena,
        }
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar la contraseña',
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


/* FIN--------Generar Contraseña Usuario normal...........*/

module.exports = router;
