'use strict';

const express = require('express');
const router = express.Router();
const Vehiculo = require('../models/vehiculos.models');

router.post('/registrar-vehiculo', (req, res) => {
    let body = req.body;
    let nuevo_vehiculo = new Vehiculo({
        numeroPlaca: body.numeroPlaca,
        tipoVehiculo: body.tipoVehiculo,
        marca: body.marca,
        modelo: body.modelo,
        annoModelo: body.annoModelo,
        extras: body.extras,
        estado: 'activo'
    });

    nuevo_vehiculo.save((error, vehiculo) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el vehiculo, ocurrió el siguiente error:',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                vehiculo
            });
        }
    });
});

module.exports = router;
