'use strict';

obtener_menu();

const tbody = document.querySelector('#tbl-listar tbody');
/* esta es la identifacion que se recoge cuando se inicia sesion*/
let identificacionInicio = localStorage.getItem('identificacion');

let mostrar_tarjetas = async() => {
    let usuario = await obtener_usuario_normal_id(identificacionInicio);    

    tbody.innerHTML = '';

    /* forma nueva*/
    if(usuario){
        if(usuario.tarjetas){
            let uTarjetas = usuario.tarjetas;
            for (let j = 0; j < uTarjetas.length; j++){
                let fila = tbody.insertRow();
                fila.insertCell().innerHTML = usuario['primer_nombre'];
                fila.insertCell().innerHTML = usuario['primer_apellido'];
                fila.insertCell().innerHTML = usuario['identificacion'];
                fila.insertCell().innerHTML = uTarjetas[j].tipoTarjeta;
            
                let celda_editar = fila.insertCell();
                let boton_editar = document.createElement('button');
                boton_editar.type = 'button';
                boton_editar.innerText = 'Editar'
    
                boton_editar.addEventListener('click', () => {
                    localStorage.setItem('identificacion_usuario', usuario.identificacion);
                    localStorage.setItem('usuario_id', usuario['_id']);
                    localStorage.setItem('tarjeta_id', uTarjetas[j]._id);
                    window.location.href = 'usuario-editar-tarjetas.html';
                });
                
                celda_editar.appendChild(boton_editar);
            }
        }
    } else {
        console.log('No se encontro el usuario');
    }              
};

mostrar_tarjetas();