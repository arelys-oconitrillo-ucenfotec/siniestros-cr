'use strict';

obtener_menu();

const tbody = document.querySelector('#tbl-listar tbody');

let obtener_reportes_asistencia = async() => {
    let lista_reporte_asistencias;

    if(conectado){
        if(tipo_usuario == 'admin'){
            lista_reporte_asistencias = await listar_reporte_asistencias();
        } else {
            lista_reporte_asistencias = await listar_reporte_asistencias_usuario_logueado();
        }
    }

    return lista_reporte_asistencias;
};

let mostrar_datos = async() => {
    let reporte_asistencias = await obtener_reportes_asistencia();
    tbody.innerHTML = '';

    for (let i = 0; i < reporte_asistencias.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = '<p>' + reporte_asistencias[i]['usuario_identificacion'] + '</p>';
        fila.insertCell().innerHTML = '<p>' + reporte_asistencias[i]['tipo_asistencia'] + '</p>';
        fila.insertCell().innerHTML = '<p>' + reporte_asistencias[i]['provincia'] + '</p>';
        fila.insertCell().innerHTML = '<p>' + reporte_asistencias[i]['canton'] + '</p>';
        fila.insertCell().innerHTML = '<p>' + reporte_asistencias[i]['distrito'] + '</p>';

        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');
        boton_editar.type = 'button';
        boton_editar.innerText = 'Editar'; 

        boton_editar.addEventListener('click', ()=> {
            localStorage.setItem('id_asistencia', reporte_asistencias[i]['_id']);
            window.location.href = 'editar-reporte-asistencia.html'; 
        });

        celda_editar.appendChild(boton_editar);
    }
};

mostrar_datos();
