'use strict';

obtener_menu();

const tbody = document.querySelector('#tbl-listar tbody');

let mostrar_datos = async() => {
    let vehiculo_caracteristicas = await listar_vehiculo_caracteristicas();
    tbody.innerHTML = '';

    if(vehiculo_caracteristicas){
        for (let i = 0; i < vehiculo_caracteristicas.length; i++) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = vehiculo_caracteristicas[i]['caracteristica'];

            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('button');
            boton_editar.type = 'button';
            boton_editar.innerText = 'Editar'; 

            boton_editar.addEventListener('click', () => {
                sessionStorage.setItem('id_vehiculo_caracteristica', vehiculo_caracteristicas[i]['_id']);
                window.location.href = 'admin-editar-vehiculo-caracteristica.html';
            });

            celda_editar.appendChild(boton_editar);
        }
    }
};

mostrar_datos();
