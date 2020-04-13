'use strict';

const tbody = document.querySelector('#tbl-listar tbody');

let mostrar_datos = async() => {
    let vehiculo_caracteristicas = await listar_vehiculo_caracteristicas();
    tbody.innerHTML = '';

    if(vehiculo_caracteristicas){
        for (let i = 0; i < vehiculo_caracteristicas.length; i++) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = vehiculo_caracteristicas[i]['caracteristica'];
            fila.insertCell().innerHTML = '<p>Acciones</p>';
        }
    }
};

mostrar_datos();
