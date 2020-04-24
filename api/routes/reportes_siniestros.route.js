'use strict';

const express = require('express');
const router = express.Router();
const ReporteSiniestro = require('../models/reportes_siniestros.model');

router.post('/registrar/reporte-siniestro', (req, res) => {
    let body = req.body;
    let nuevo_reporte_siniestro = new ReporteSiniestro({
        usuario_identificacion: body.usuario_identificacion,
        tipo_siniestro: body.tipo_siniestro,
        descripcion: body.descripcion,
        ruta_id: body.ruta_id,
        latitud: body.latitud,
        longitud: body.longitud
    });

    nuevo_reporte_siniestro.save((error, reporte_siniestroDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el reporte siniestro, ocurrió el siguiente error:',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                reporte_siniestroDB
            });
        }
    });


});

router.get('/listar/reporte-siniestros', (req, res) => {
    ReporteSiniestro.find((error, lista_reportes_siniestros) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar los reportes siniestros',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los reportes_siniestros se listaron adecuadamente',
                lista_reportes_siniestros
            });
        }
    });
});

router.put('/modificar/reporte-siniestro', function (req, res) {
    let body = req.body;

    ReporteSiniestro.updateOne({
        _id: body._id
    }, {
        $set: req.body
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el reporte siniestro',
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

router.delete('/eliminar/reporte-siniestro', function (req, res) {
    let body = req.body;

    ReporteSiniestro.deleteOne({
        _id: body._id
    }).then(resultado => {

        if (resultado.deletedCount == 1) {
            res.json({
                resultado: true,
                msg: 'Se eliminó el reporte siniestro'
            });
        } else {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el reporte siniestro'
            });
        }
    });
});

router.get('/buscar/reporte-siniestro/usuario', function(req,res) {

    let usuario_identificacion = req.query.usuario_identificacion

    ReporteSiniestro.find({ usuario_identificacion: usuario_identificacion }, (error, lista_reporte_siniestroDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se encontró ningun reporte siniestro con ese usuario',
                error
            });
        } else {
            res.json({
                resultado: true,
                lista_reporte_siniestroDB
            });
        }
    });
});

router.get('/buscar/reporte-siniestro/tipo_siniestro', function(req,res) {

    let usuario_identificacion = req.query.usuario_identificacion

    ReporteSiniestro.find({ usuario_identificacion: usuario_identificacion }, (error, lista_reporte_siniestroDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se encontró ningun reporte siniestro con ese nombre',
                error
            });
        } else {
            res.json({
                resultado: true,
                lista_reporte_siniestroDB
            });
        }
    });
});
module.exports = router;
