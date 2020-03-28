'use strict';
const tbody = document.querySelector('#tbl-usuarios tbody');

let mostrar_datos = async() => {
    let usuarios = await listar_usuarios();
    tbody.innerHTML = '';

    for (let i = 0; i < usuarios.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = usuarios[i]['primer_nombre'];
        fila.insertCell().innerHTML = usuarios[i]['primer_apellido'];
        fila.insertCell().innerHTML = usuarios[i]['identificacion'];
        fila.insertCell().innerHTML = usuarios[i]['correo'];
    }
};

mostrar_datos();