'use strict';

const tbody = document.querySelector('#tbl-listar tbody');

obtener_menu();

let mostrar_datos = async() => {
    let tipo_incidentes = await listar_tipo_incidentes();
    tbody.innerHTML = '';

    for (let i = 0; i < tipo_incidentes.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = '<p>' + tipo_incidentes[i]['nombre_siniestro'] + '</p>';
        fila.insertCell().innerHTML = '<img class="lista-imgs" src="' + tipo_incidentes[i]['icono'] + '">';
        
        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');
        boton_editar.type = 'button';
        boton_editar.innerText = 'Editar'; 

        boton_editar.addEventListener('click', ()=> {
            sessionStorage.setItem('nombre_siniestro', tipo_incidentes[i]['nombre_siniestro']);
            window.location.href = 'editar-tipo-incidente.html'; 
        });

        celda_editar.appendChild(boton_editar);
    }
};

mostrar_datos();
