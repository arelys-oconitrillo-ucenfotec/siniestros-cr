'use strict';

const express = require('express');
const router = express.Router();
const Vehiculo = require('../models/vehiculos.model');

router.post('/registrar/vehiculo', (req, res) => {
    let body = req.body;
    let nuevo_vehiculo = new Vehiculo({
        numeroPlaca: body.numeroPlaca,
        marca: body.marca,
        modelo: body.modelo,
        annoModelo: body.annoModelo,
        color: body.color,
        caracteristicas: body.caracteristicas,
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

router.get('/listar/vehiculos', (req, res) => {
    Vehiculo.find((error, lista_vehiculos) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudieron listar los vehículos',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los vehículos se listaron adecuadamente',
                lista_vehiculos
            });
        }
    });
});

router.delete('/eliminar/vehiculo', function (req, res) {
    let body = req.body;

    Vehiculo.deleteOne({
        _id: body._id
    }).then(resultado => {

        if (resultado.deletedCount == 1) {
            res.json({
                resultado: true,
                msg: 'Se eliminó el vehículo'
            });
        } else {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el vehículo'
            });
        }
    });
});

router.put('/modificar/vehiculo', function (req, res) {
    let body = req.body;

    Vehiculo.updateOne({
        _id: body._id
    }, {
        $set: req.body
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el vehículo',
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
