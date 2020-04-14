'use strict';

const express = require('express');
const router = express.Router();
const UsuarioEspecializado = require('../models/usuarios_especializados.model');

router.post('/registrar/usuario-especializado', (req, res) => {
    let body = req.body;
    let nuevo_usuario_especializado = new UsuarioEspecializado({
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
        tipo: body.tipo,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        otras_senas: body.otras_senas,
        rol: body.rol,
        codigo_activacion: body.codigo_activacion,
        contrasena: body.contrasena,
        estado: body.estado
    });

    nuevo_usuario_especializado.save((error, usuario_especializadoDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el usuario especializado, ocurrió el siguiente error:',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                usuario_especializadoDB
            });
        }
    });


});

router.get('/listar/usuarios-normales', (req, res) => {
    UsuarioEspecializado.find((error, lista_usuarios_especializados) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar los usuarios especializados',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los usuarios especializados se listaron adecuadamente',
                lista_usuarios_especializados
            });
        }
    });
});

router.put('/modificar/usuario-especializado', function (req, res) {
    let body = req.body;

    UsuarioEspecializado.updateOne({
        _id: body._id
    }, {
        $set: req.body
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el usuario especializado',
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

router.delete('/eliminar/usuario-especializado', function (req, res) {
    let body = req.body;

    UsuarioEspecializado.deleteOne({
        _id: body._id
    }).then(resultado => {

        if (resultado.deletedCount == 1) {
            res.json({
                resultado: true,
                msg: 'Se eliminó el usuario especializado'
            });
        } else {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el usuario especializado'
            });
        }
    });
});


router.post('/validar_credenciales', function (req, res) {
    let body = req.body;

    UsuarioEspecializado.findOne({
        correo: req.body.correo
    }).then(
        function (usuario_especializado) {
            if (usuario_especializado) {
                if (usuario_especializado.contrasena == req.body.contrasena) {
                    res.json({
                        success: true,
                        usuario_especializado: usuario_especializado
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
