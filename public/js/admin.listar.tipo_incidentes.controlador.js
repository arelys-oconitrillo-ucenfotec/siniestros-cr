'use strict';

const tbody = document.querySelector('#tbl-listar tbody');

obtener_menu();

let mostrar_datos = async() => {
    let tipo_incidentes = await listar_tipo_incidentes();
    tbody.innerHTML = '';

    for (let i = 0; i < tipo_incidentes.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = '<p>' + tipo_incidentes[i]['nombre_siniestro'] + '</p>';
        fila.insertCell().innerHTML = '<p>' + tipo_incidentes[i]['icono'] + '</p>';
        fila.insertCell().innerHTML = '<p>Acciones</p>';
    }
};

mostrar_datos();
