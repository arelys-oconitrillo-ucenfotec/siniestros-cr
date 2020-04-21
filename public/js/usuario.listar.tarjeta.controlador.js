'use strict';


const tbody = document.querySelector('#tbl-listar tbody');
let identificacionInicio = sessionStorage.getItem('identificacion');

let mostrar_tarjetas = async() => {
    let usuario = await obtener_usuario_normal_id(identificacionInicio);
    tbody.innerHTML = '';

  /* modificart para que solo sea un usuario y luego ver como se comporta*/

    /*  asi se listarian todos los usuarios
    
    for (let i = 0; i < usuarios.length; i++) {
        let fila = tbody.insertRow();
        let error = false;
        for (let j = 0; j < usuarios[i].tarjetas.length; j++){
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
            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('button');
            boton_editar.type = 'button';
            boton_editar.innerText = 'Editar'

            boton_editar.addEventListener('click', () => {
            localStorage.setItem('identificacion_usuario', usuarios[i].identificacion);
            console.log(usuarios[i].identificacion);
            window.location.href = 'usuario-editar-tarjetas.html';
        });
    }
    */               
        /* forma nueva*/
        let fila = tbody.insertRow();
        let error = false;

        for (let j = 0; j < usuario.tarjetas.length; j++){
            let existe;
            let uTarjetas = [];
            uTarjetas = usuario.tarjetas[j];
            existe = uTarjetas.length;
            if (existe == 'undefined') {
                error = true;
                console.log (existe);
            }
            if (!error) {
                fila.insertCell().innerHTML = usuario['primer_nombre'];
                fila.insertCell().innerHTML = usuario['primer_apellido'];
                fila.insertCell().innerHTML = usuario['identificacion'];
                fila.insertCell().innerHTML = uTarjetas.tipoTarjeta;
            }
        /* fin de forma nueva*/
       
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
            localStorage.setItem('identificacion_usuario', usuario.identificacion);
            console.log(usuario.identificacion);
            window.location.href = 'usuario-editar-tarjetas.html';
        });
        celda_editar.appendChild(boton_editar);
        }
        let celda_cancelar = fila.insertCell();
        let boton_cancelar = document.createElement('button');
        boton_cancelar.type = 'button';
        boton_cancelar.innerText = 'Cancelar'
        celda_cancelar.appendChild(boton_cancelar);

        boton_cancelar.addEventListener('click', () => {
            localStorage.setItem('identificacion_usuario', usuario.identificacion);
            console.log(usuario.identificacion);
            window.location.href = 'bienvenido-sesion.html';
        });
    
};

mostrar_tarjetas();