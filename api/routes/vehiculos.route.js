'use strict';

const express = require('express');
const router = express.Router();
const Vehiculo = require('../models/vehiculos.model');
const UsuarioNormal = require('../models/usuarios_normales.model');

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

router.post('/registrar/propietario-vehiculo', (req, res) => {
    let body = req.body;
    let nuevo_propietario_vehiculo = new PropietarioVehiculo({
        tipo_identificacion: body.tipo_identificacion,
        identificacion: body.identificacion,
        razon_social: body.razon_social,
        nombre_comercial: body.nombre_comercial,
        info_aponderado: body.info_aponderado,
        primer_nombre: body.primer_nombre,
        segundo_nombre: body.segundo_nombre,
        primer_apellido: body.primer_apellido,
        segundo_apellido: body.segundo_apellido,
        genero: body.genero,
        correo: body.correo,
        telefono: body.telefono,
        vehiculos: body.vehiculos
    });

    nuevo_propietario_vehiculo.save((error, propietario_vehiculoDB) => {
        if (error) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el propietario del vehiculo, ocurrió el siguiente error:',
                error
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                propietario_vehiculoDB
            });
        }
    });
});

router.get('/obtener/propietario-vehiculo/:id', (req, res) => {
    let id = req.params.id;

    UsuarioNormal.findOne({
        _id: id
    }).then(resultado => {
        if (resultado) {
            res.json({
                existe: true,
                propietario: resultado,
                msg: 'Se encontro el propietario'
            });
        } else {
            res.json({
                existe: false,
                msj: 'No existe el propietario'
            });
        }
    });
});

module.exports = router;
