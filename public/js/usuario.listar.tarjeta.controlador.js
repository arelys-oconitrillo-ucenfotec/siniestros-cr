'use strict';


const tbody = document.querySelector('#tbl-listar tbody');

let mostrar_tarjetas = async() => {
    let usuarios = await listar_usuarios_normal_tarjeta();
    tbody.innerHTML = '';

  

    for (let i = 0; i < usuarios.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = usuarios[i]['primer_nombre'];
        fila.insertCell().innerHTML = usuarios[i]['primer_apellido'];
        fila.insertCell().innerHTML = usuarios[i]['identificacion'];
        let tarjetas = []
        for (let j = 0; j < usuarios[i].tarjetas.length; i++){
            tarjetas = usuarios[i].tarjetas[j];
            console.log (tarjetas);
        }
        fila.insertCell().innerHTML = tarjetas.tipoTarjeta;
        /*fila.insertCell().innerHTML = usuarios[i]['tarjetas'];*/
        fila.insertCell().innerHTML = '<p>Acciones</p>';

        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');
        boton_editar.type = 'button';
        boton_editar.innerText = 'Editar'

        boton_editar.addEventListener('click', () => {
            localStorage.setItem('identificacion_usuario', usuarios[i].identificacion);
            console.log(usuarios[i].identificacion);
        });

        celda_editar.appendChild(boton_editar);
    }
};

mostrar_tarjetas();