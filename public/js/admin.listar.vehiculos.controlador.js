'use strict';

obtener_menu();

const tbody = document.querySelector('#tbl-listar tbody');

let obtener_vehiculos = async() => {
    let lista_vehiculos;

    if(conectado){
        if(tipo_usuario == 'admin'){
            lista_vehiculos = await listar_vehiculos();
        } else {
            lista_vehiculos = await listar_vehiculos_usuario_logueado();
        }
    }

    return lista_vehiculos;
};

let mostrar_datos = async() => {
    tbody.innerHTML = '';
    let vehiculos = await obtener_vehiculos();

    if(vehiculos){
        for (let i = 0; i < vehiculos.length; i++) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = '<p>' + vehiculos[i]['numeroPlaca'] + '</p>';
            fila.insertCell().innerHTML = '<p>' + vehiculos[i]['marca'] + '</p>';
            fila.insertCell().innerHTML = '<p>' + vehiculos[i]['modelo'] + '</p>';
            fila.insertCell().innerHTML = '<p>' + vehiculos[i]['annoModelo'] + '</p>';
            fila.insertCell().appendChild(mostrar_caracteristicas(vehiculos[i]['caracteristicas']));
            
            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('button');
            boton_editar.type = 'button';
            boton_editar.innerText = 'Editar'; 

            boton_editar.addEventListener('click', () => {
                sessionStorage.setItem('placa_vehiculo', vehiculos[i]['numeroPlaca']);
                window.location.href = 'editar-vehiculo.html'; 
            });

            celda_editar.appendChild(boton_editar);
        }
    }
};

mostrar_datos();
