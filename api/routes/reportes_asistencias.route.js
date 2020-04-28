'use strict';

const express = require('express');
const router = express.Router();
const ReporteAsistencia = require('../models/reportes_asistencias.model');

router.post('/registrar/reporte-asistencia', (req, res) => {
    let body = req.body;
    let nuevo_reporte_asistencia = new ReporteAsistencia({
        usuario_identificacion: body.usuario_identificacion,
        tipo_asistencia: body.tipo_asistencia,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        otras_senas: body.otras_senas
    });

    nuevo_reporte_asistencia.save((error, reporte_asistenciaDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el reporte asistencia, ocurrió el siguiente error:',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                reporte_asistenciaDB
            });
        }
    });


});

router.get('/listar/reporte-asistencias', (req, res) => {
    ReporteAsistencia.find((error, lista_reportes_asistencias) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar los reportes asistencias',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los reportes asistencias se listaron adecuadamente',
                lista_reportes_asistencias
            });
        }
    });
});

router.put('/modificar/reporte-asistencia', function (req, res) {
    let body = req.body;
    ReporteAsistencia.updateOne({
        _id: body._id
    }, {
        $set: req.body
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el reporte asistencia',
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

router.delete('/eliminar/reporte-asistencia', function (req, res) {
    let body = req.body;

    ReporteAsistencia.deleteOne({
        _id: body._id
    }).then(resultado => {

        if (resultado.deletedCount == 1) {
            res.json({
                resultado: true,
                msg: 'Se eliminó el reporte asistencia'
            });
        } else {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el reporte asistencia'
            });
        }
    });
});

router.get('/buscar/reporte-asistencia/usuario', function(req,res) {

    let usuario_identificacion = req.query.usuario_identificacion

    ReporteAsistencia.find({ usuario_identificacion: usuario_identificacion }, (error, lista_reporte_asistenciaDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se encontró ningun reporte asistencia con ese usuario',
                error
            });
        } else {
            res.json({
                resultado: true,
                lista_reporte_asistenciaDB
            });
        }
    });
});

router.get('/buscar/reporte-asistencia/id', function(req,res) {

    let id = req.query.id

    ReporteAsistencia.findOne({ _id: id }, (error, reporte_asistenciaDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se encontró ningun reporte asistencia con ese usuario',
                error
            });
        } else {
            res.json({
                resultado: true,
                reporte_asistencia: reporte_asistenciaDB
            });
        }
    });
});

router.get('/buscar/reporte-asistencia/tipo_asistencia', function(req,res) {

    let usuario_identificacion = req.query.usuario_identificacion

    ReporteAsistencia.find({ usuario_identificacion: usuario_identificacion }, (error, lista_reporte_asistenciaDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se encontró ningun reporte asistencia con ese nombre',
                error
            });
        } else {
            res.json({
                resultado: true,
                lista_reporte_asistenciaDB
            });
        }
    });
});
module.exports = router;
