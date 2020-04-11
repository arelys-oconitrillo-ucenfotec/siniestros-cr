'use strict';

const tbody = document.querySelector('#tbl-listar tbody');

let mostrar_datos = async() => {
    let tipo_incidentes = await listar_tipo_incidentes();
    tbody.innerHTML = '';

    for (let i = 0; i < tipo_incidentes.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = tipo_incidentes[i]['nombre_siniestro'];
        fila.insertCell().innerHTML = tipo_incidentes[i]['icono'];
    }
};

mostrar_datos();
