'use strict';

const tbody = document.querySelector('#tbl-vehiculos tbody');

let mostrar_datos = async() => {
    let vehiculos = await listar_vehiculos();
    tbody.innerHTML = '';

    if(vehiculos){
        for (let i = 0; i < vehiculos.length; i++) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = vehiculos[i]['tipoVehiculo'];
            fila.insertCell().innerHTML = vehiculos[i]['numeroPlaca'];
            fila.insertCell().innerHTML = vehiculos[i]['marca'];
            fila.insertCell().innerHTML = vehiculos[i]['modelo'];
            fila.insertCell().innerHTML = vehiculos[i]['annoModelo'];
            fila.insertCell().innerHTML = vehiculos[i]['caracteristicas'];
        }
    }
};

mostrar_datos();
