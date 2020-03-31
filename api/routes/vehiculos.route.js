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

router.get('/listar-vehiculos', (req, res) => {
    Vehiculo.find((error, lista_vehiculo) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudieron listar los vheiculos',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los vehiculos se listaron adecuadamente',
                lista_vehiculo
            });
        }
    });
});

router.delete('/eliminar-vehiculo', function (req, res) {
    let body = req.body;

    Vehiculo.deleteOne({
        _id: body._id
    }).then(resultado => {

        if (resultado.deletedCount == 1) {
            res.json({
                resultado: true,
                msg: 'Se eliminó el vhehiculo'
            });
        } else {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el vehiculo'
            });
        }
    });
});

router.put('/modificar-vehiculo', function (req, res) {
    let body = req.body;

    Vehiculo.updateOne({
        _id: body._id
    }, {
        $set: req.body
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el vehiculo',
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

module.exports = router;
