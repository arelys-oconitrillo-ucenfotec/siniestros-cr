'use strict';

obtener_menu();

const tbody = document.querySelector('#tbl-listar tbody');

let mostrar_datos = async() => {
    let reporte_asistencias = await listar_reporte_asistencias();
    tbody.innerHTML = '';

    for (let i = 0; i < reporte_asistencias.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = '<p>' + reporte_asistencias[i]['nombre_asistencia'] + '</p>';
        
        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');
        boton_editar.type = 'button';
        boton_editar.innerText = 'Editar'; 

        boton_editar.addEventListener('click', ()=> {
            localStorage.setItem('nombre_asistencia', reporte_asistencias[i]['nombre_asistencia']);
            window.location.href = 'editar-tipo-asistencia.html'; 
        });

        celda_editar.appendChild(boton_editar);
    }
};

mostrar_datos();
