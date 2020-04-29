'use strict';

obtener_menu();

const tbody = document.querySelector('#tbl-listar tbody');

let mostrar_datos = async() => {
    let tipo_asistencias = await listar_tipo_asistencias();
    tbody.innerHTML = '';

    for (let i = 0; i < tipo_asistencias.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = '<p>' + tipo_asistencias[i]['nombre_asistencia'] + '</p>';
        fila.insertCell().innerHTML = '<p>' + tipo_asistencias[i]['descripcion'] + '</p>';
        fila.insertCell().innerHTML = '<p>' + tipo_asistencias[i]['costo'] + '</p>';
        
        if (localStorage.getItem('conectado')){
            if (localStorage.getItem('tipo_usuario') == 'admin'){
                let celda_editar = fila.insertCell();
                let boton_editar = document.createElement('button');
                boton_editar.type = 'button';
                boton_editar.innerText = 'Editar'; 
        
                boton_editar.addEventListener('click', ()=> {
                    localStorage.setItem('nombre_asistencia', tipo_asistencias[i]['nombre_asistencia']);
                    window.location.href = 'editar-tipo-asistencia.html'; 
                });
        
                celda_editar.appendChild(boton_editar);
            }
           
        } 

       
    }
};

mostrar_datos();
