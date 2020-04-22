'use strict';

obtener_menu();

const tbody = document.querySelector('#tbl-listar tbody');

let mostrar_caracteristicas = (caracteristicas) => {
    let contenedor_caracteristicas = document.createElement('div');
    for(let i = 0; i < caracteristicas.length; i++){
        let elemento_caracteristica = document.createElement('p');
        elemento_caracteristica.innerText = caracteristicas[i].vehiculo_caracteristica;
        contenedor_caracteristicas.appendChild(elemento_caracteristica);
    }

    return contenedor_caracteristicas;
}

let mostrar_datos = async() => {
    let vehiculos = await listar_vehiculos();
    tbody.innerHTML = '';

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

            boton_editar.addEventListener('click', ()=> {
                localStorage.setItem('placa_vehiculo', vehiculos[i]['numeroPlaca']);
                window.location.href = 'editar-vehiculo.html'; 
            });

            celda_editar.appendChild(boton_editar);
        }
    }
};

mostrar_datos();
