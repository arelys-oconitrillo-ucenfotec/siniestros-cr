'use strict';

const express = require('express');
const router = express.Router();
const VehiculoCaracteristica = require('../models/vehiculos_caracteristicas.model');

router.post('/registrar/vehiculo-caracteristica', (req, res) => {
    let body = req.body;
    let nuevo_vehiculo_caracteristica = new VehiculoCaracteristica({
        caracteristica: body.caracteristica
    });

    nuevo_vehiculo_caracteristica.save((error, vehiculo_caracteristicaDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la caracteristica, ocurrió el siguiente error:',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                vehiculo_caracteristicaDB
            });
        }
    });


});

router.get('/listar/vehiculo-caracteristicas', (req, res) => {
    VehiculoCaracteristica.find((error, lista_caracteristicas) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar las caracteristicas',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Las caracteristicas se listaron adecuadamente',
                lista_caracteristicas
            });
        }
    });
});

router.put('/modificar/vehiculo-caracteristica', function (req, res) {
    let body = req.body;

    VehiculoCaracteristica.updateOne({
        _id: body._id
    }, {
        $set: req.body
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar la caracteristica',
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

router.delete('/eliminar/vehiculo-caracteristica', function (req, res) {
    let body = req.body;

    VehiculoCaracteristica.deleteOne({
        _id: body._id
    }).then(resultado => {

        if (resultado.deletedCount == 1) {
            res.json({
                resultado: true,
                msg: 'Se eliminó la caracteristica'
            });
        } else {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar la caracteristica'
            });
        }
    });
});

module.exports = router;
