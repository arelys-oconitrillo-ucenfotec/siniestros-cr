'use strict';

const express = require('express');
const router = express.Router();
const Usuarios = require('../models/usuarios_normales.model');

router.post('/agregar-tarjeta', function(req, res) {
    Usuarios.update({ _id: req.body._id }, {
        $push: {
            'tarjetas': {
                tipoTarjeta: req.body.tipoTarjeta,
                numeroTarjeta: req.body.numeroTarjeta,
                fechaExp: req.body.fechaExp
            }
        }

    },
    function(error) {
        if (error) {
            return res.json({
                success: false,
                msj: 'No se pudo agregar la tarjeta',
                err
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