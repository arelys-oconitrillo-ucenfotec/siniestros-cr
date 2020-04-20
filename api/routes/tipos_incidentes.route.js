'use strict';

const express = require('express');
const router = express.Router();
const TipoIncidente= require('../models/tipos_incidentes.model');

router.post('/registrar/tipo-incidente', (req, res) => {
    let body = req.body;
    let nuevo_tipo_incidente= new TipoIncidente({
        nombre_siniestro: body.nombre_siniestro,
        icono: body.icono
    });

    nuevo_tipo_incidente.save((error, tipo_incidenteDB) => {
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
                tipo_incidenteDB
            });
        }
    });


});

router.get('/listar/tipo-incidentes', (req, res) => {
    TipoIncidente.find((error, lista_incidentes) => {
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

router.put('/modificar/tipo-incidente', function (req, res) {
    let body = req.body;

    TipoIncidente.updateOne({
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

router.delete('/eliminar/tipo-incidente', function (req, res) {
    let body = req.body;

    TipoIncidente.deleteOne({
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

router.get('/buscar/tipo-incidente', function(req,res) {

    let nombre_siniestro = req.query.nombre_siniestro

    TipoIncidente.findOne({ nombre_siniestro: nombre_siniestro }, (error, tipo_incidenteDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se encontró ningun siniestro con ese nombre',
                error
            });
        } else {
            res.json({
                resultado: true,
                tipo_incidente: tipo_incidenteDB
            });
        }
    });
});
module.exports = router;
