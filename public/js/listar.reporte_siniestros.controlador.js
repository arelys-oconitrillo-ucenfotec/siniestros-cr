'use strict';

obtener_menu();

const tbody = document.querySelector('#tbl-listar tbody');

let obtener_reportes_siniestro = async() => {
    let lista_reporte_siniestros;

    if(conectado){
        if(tipo_usuario == 'admin'){
            lista_reporte_siniestros = await listar_reporte_siniestros();
        } else {
            lista_reporte_siniestros = await listar_reporte_siniestros_usuario_logueado();
        }
    }

    return lista_reporte_siniestros;
};

let mostrar_datos = async() => {
    let reporte_siniestros = await obtener_reportes_siniestro();
    tbody.innerHTML = '';

    for (let i = 0; i < reporte_siniestros.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = '<p>' + reporte_siniestros[i]['usuario_identificacion'] + '</p>';
        fila.insertCell().innerHTML = '<p>' + reporte_siniestros[i]['tipo_siniestro'] + '</p>';
        fila.insertCell().innerHTML = '<p>' + reporte_siniestros[i]['ruta_id'] + '</p>';
        fila.insertCell().innerHTML = '<p>' + reporte_siniestros[i]['latitud'] + '</p>';
        fila.insertCell().innerHTML = '<p>' + reporte_siniestros[i]['longitud'] + '</p>';

        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');
        boton_editar.type = 'button';
        boton_editar.innerText = 'Editar'; 

        boton_editar.addEventListener('click', ()=> {
            localStorage.setItem('id_asistencia', reporte_siniestros[i]['_id']);
            window.location.href = 'editar-reporte-asistencia.html'; 
        });

        celda_editar.appendChild(boton_editar);
    }
};

mostrar_datos();
