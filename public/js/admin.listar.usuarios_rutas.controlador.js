'use strict';

obtener_menu();

const tbody = document.querySelector('#tbl-listar tbody');

let mostrar_datos = async() => {
    let usuarios = await listar_usuarios_rutas();
    tbody.innerHTML = '';

    for (let i = 0; i < usuarios.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = usuarios[i]['primer_nombre'];
        fila.insertCell().innerHTML = usuarios[i]['primer_apellido'];
        fila.insertCell().innerHTML = usuarios[i]['identificacion'];
        fila.insertCell().innerHTML = usuarios[i]['correo'];
    
        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');
        boton_editar.type = 'button';
        boton_editar.innerText = 'Editar'; 

        boton_editar.addEventListener('click', ()=> {
            localStorage.setItem('identificacion_usuario_ruta', usuarios[i]['identificacion']);
            window.location.href = 'editar-usuario-ruta.html'; 
        });

        celda_editar.appendChild(boton_editar);
    }
};

mostrar_datos();