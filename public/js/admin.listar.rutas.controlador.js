'use strict';

obtener_menu();

const tbody = document.querySelector('#tbl-listar tbody');

let mostrar_datos = async() => {
    let rutas = await listar_rutas();
    tbody.innerHTML = '';

    for (let i = 0; i < rutas.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = '<p>' + rutas[i]['nombre_ruta'] + '</p>';
        fila.insertCell().innerHTML = '<p>Mapa</p>';
        
        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');
        boton_editar.type = 'button';
        boton_editar.innerText = 'Editar'; 

        boton_editar.addEventListener('click', ()=> {
            sessionStorage.setItem('nombre_ruta', rutas[i]['nombre_ruta']);
            window.location.href = 'editar-ruta.html'; 
        });

        celda_editar.appendChild(boton_editar);
    }
};

mostrar_datos();
