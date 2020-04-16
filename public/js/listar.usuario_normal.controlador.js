'use strict';

obtener_menu();

const tbody = document.querySelector('#tbl-listar tbody');

let mostrar_datos = async() => {
    let usuarios = await listar_usuarios_normales();
    tbody.innerHTML = '';

    for (let i = 0; i < usuarios.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = usuarios[i]['primer_nombre'];
        fila.insertCell().innerHTML = usuarios[i]['primer_apellido'];
        fila.insertCell().innerHTML = usuarios[i]['identificacion'];
        fila.insertCell().innerHTML = usuarios[i]['correo'];
        fila.insertCell().innerHTML = '<p>Acciones</p>';
    }
};

mostrar_datos();