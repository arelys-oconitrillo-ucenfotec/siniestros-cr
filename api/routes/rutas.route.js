'use strict';

const express = require('express');
const router = express.Router();
const Ruta = require('../models/rutas.model');

router.post('/registrar/ruta', (req, res) => {
    let body = req.body;
    let nuevo_ruta = new Ruta({
        nombre_ruta: body.nombre_ruta,
        latitud_inicio: body.latitud_inicio,
        longitud_inicio: body.longitud_inicio,
        latitud_fin: body.latitud_fin,
        longitud_fin: body.longitud_fin
    });

    nuevo_ruta.save((error, rutaDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la ruta, ocurrió el siguiente error:',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                rutaDB
            });
        }
    });


});

router.get('/listar/rutas', (req, res) => {
    Ruta.find((error, lista_rutas) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar las rutas',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Las rutas se listaron adecuadamente',
                lista_rutas
            });
        }
    });
});

router.put('/modificar/ruta', function (req, res) {
    let body = req.body;

    Ruta.updateOne({
        _id: body._id
    }, {
        $set: req.body
    }, function (error, info) {
        if (error) {
            res.json({
                resultado: false,
                msg: 'No se pudo modificar el ruta',
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

router.delete('/eliminar/ruta', function (req, res) {
    let body = req.body;

    Ruta.deleteOne({
        _id: body._id
    }).then(resultado => {

        if (resultado.deletedCount == 1) {
            res.json({
                resultado: true,
                msg: 'Se eliminó el ruta'
            });
        } else {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar el ruta'
            });
        }
    });
});

router.get('/buscar/ruta', function(req,res) {

    let nombre_ruta = req.query.nombre_ruta

    Ruta.findOne({ nombre_ruta: nombre_ruta }, (error, rutaDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se encontró ningun ruta con ese nombre',
                error
            });
        } else {
            res.json({
                resultado: true,
                ruta: rutaDB
            });
        }
    });
});
module.exports = router;
