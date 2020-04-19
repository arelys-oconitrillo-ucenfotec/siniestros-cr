'use strict';


const tbody = document.querySelector('#tbl-listar tbody');

let mostrar_tarjetas = async() => {
    let usuarios = await listar_usuarios_normal_tarjeta();
    tbody.innerHTML = '';

  

    for (let i = 0; i < usuarios.length; i++) {
        let fila = tbody.insertRow();
                   
        /* forma nueva*/
        let error = false;

        for (let j = 0; j < usuarios[i].tarjetas.length; i++){
            let existe;
            let uTarjetas = [];
            uTarjetas = usuarios[i].tarjetas[j];
            existe = uTarjetas.length;
            if (existe == 'undefined') {
                error = true;
                console.log (existe);
            }
            if (!error) {
                fila.insertCell().innerHTML = usuarios[i]['primer_nombre'];
                fila.insertCell().innerHTML = usuarios[i]['primer_apellido'];
                fila.insertCell().innerHTML = usuarios[i]['identificacion'];
                fila.insertCell().innerHTML = uTarjetas.tipoTarjeta;
            }
        /* fin de forma nueva*/
        /*fila.insertCell().innerHTML = usuarios[i]['tarjetas'];*/
        /*fila.insertCell().innerHTML = '<p>Acciones</p>';*/

        /* forma vieja/
        fila.insertCell().innerHTML = usuarios[i]['primer_nombre'];
        fila.insertCell().innerHTML = usuarios[i]['primer_apellido'];
        fila.insertCell().innerHTML = usuarios[i]['identificacion'];
        let tarjetas = [];

	    let error = false;

	    for (let j = 0; j < usuarios[i].tarjetas.length; i++){

	        tarjetas = usuarios[i].tarjetas[j];
 	        console.log (tarjetas);
        }
        fila.insertCell().innerHTML = tarjetas.tipoTarjeta;

        /*fin de forma vieja*/

        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');
        boton_editar.type = 'button';
        boton_editar.innerText = 'Editar'

        boton_editar.addEventListener('click', () => {
            localStorage.setItem('identificacion_usuario', usuarios[i].identificacion);
            console.log(usuarios[i].identificacion);
            window.location.href = 'usuario-editar-tarjetas.html';
        });

        celda_editar.appendChild(boton_editar);
        }
    }
};

mostrar_tarjetas();