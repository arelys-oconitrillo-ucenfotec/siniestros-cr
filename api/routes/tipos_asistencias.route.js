'use strict';

const express = require('express');
const router = express.Router();
const TipoAsistencia = require('../models/tipos_asistencias.model');

router.post('/registrar/tipo-asistencia', (req, res) => {
    let body = req.body;
    let nuevo_tipo_asistencia = new TipoAsistencia({
        nombre_asistencia: body.nombre_asistencia,
        descripcion: body.descripcion,
        costo: body.costo
    });

    nuevo_tipo_asistencia.save((error, tipo_asistenciaDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el asistencia, ocurrió el siguiente error:',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                tipo_asistenciaDB
            });
        }
    });


});

router.get('/listar/tipo-asistencias', (req, res) => {
    TipoAsistencia.find((error, lista_asistencias) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar los asistencias',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los asistencias se listaron adecuadamente',
                lista_asistencias
            });
        }
    });
});

router.put('/modificar/tipo-asistencia', function (req, res) {
    let body = req.body;

    TipoAsistencia.updateOne({
        _id: body._id
    }, {
        $set: req.body
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el asistencia',
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

router.delete('/eliminar/tipo-asistencia', function (req, res) {
    let body = req.body;

    TipoAsistencia.deleteOne({
        _id: body._id
    }).then(resultado => {

        if (resultado.deletedCount == 1) {
            res.json({
                resultado: true,
                msg: 'Se eliminó el asistencia'
            });
        } else {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el asistencia'
            });
        }
    });
});

router.get('/buscar/tipo-asistencia', function(req,res) {

    let nombre_asistencia = req.query.nombre_asistencia

    TipoAsistencia.findOne({ nombre_asistencia: nombre_asistencia }, (error, tipo_asistenciaDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se encontró ningun asistencia con ese nombre',
                error
            });
        } else {
            res.json({
                resultado: true,
                tipo_asistencia: tipo_asistenciaDB
            });
        }
    });
});
module.exports = router;
