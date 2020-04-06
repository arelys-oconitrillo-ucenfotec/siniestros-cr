'use strict';

const express = require('express');
const router = express.Router();
const Incidente= require('../models/incidentes.model');

router.post('/registrar-incidente', (req, res) => {
    let body = req.body;
    let nuevo_incidente= new Incidente({
        nombre_siniestro: body.nombre_siniestro,
        icono: body.icono
    });

    nuevo_incidente.save((error, incidenteDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el incidente, ocurrió el siguiente error:',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                incidenteDB
            });
        }
    });


});

router.get('/listar-incidentes', (req, res) => {
    Incidente.find((error, lista_incidentes) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar los incidentes',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los incidentes se listaron adecuadamente',
                lista_incidentes
            });
        }
    });
});

router.put('/modificar-incidente', function (req, res) {
    let body = req.body;

    Incidente.updateOne({
        _id: body._id
    }, {
        $set: req.body
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el incidente',
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

router.delete('/eliminar-incidente', function (req, res) {
    let body = req.body;

    Incidente.deleteOne({
        _id: body._id
    }).then(resultado => {

        if (resultado.deletedCount == 1) {
            res.json({
                resultado: true,
                msg: 'Se eliminó el incidente'
            });
        } else {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el incidente'
            });
        }
    });
});

module.exports = router;
