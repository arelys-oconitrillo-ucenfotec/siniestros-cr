'use strict';
let identificacion = localStorage.getItem('identificacion_usuario_normal');

const botonRegistrar = document.querySelector('#btnRegistrar');
const input_primer_nombre = document.querySelector('#txtPrimerNombre');
const input_segundo_nombre = document.querySelector('#txtSegundoNombre');
const input_primer_apellido = document.querySelector('#txtPrimerApellido');
const input_segundo_apellido = document.querySelector('#txtSegundoApellido');
const input_correo = document.querySelector('#txtEmail');
const input_telefono = document.querySelector('#txtTelefono');
const input_fotografia = document.querySelector('#txtUrlImg');
const input_img = document.querySelector('#icon-img');
   

let llenar_campos = async() => {
    let usuario_normal = await obtener_usuario_normal_id(identificacion);

    input_primer_nombre.value = usuario_normal.primer_nombre;
    input_segundo_nombre.value = usuario_normal.segundo_nombre;
    input_primer_apellido.value = usuario_normal.primer_apellido;
    input_segundo_apellido.value = usuario_normal.segundo_apellido;
    input_correo.value = usuario_normal.correo;
    input_telefono.value = usuario_normal.telefono;
    input_fotografia.value = usuario_normal.fotografia;
    input_img.src = usuario_normal.img;

    switch(usuario_normal.field-genero){
        case 'Femenino':
            document.querySelector('#rbtFemenino').checked = true;
        break;
        case 'Masculino':
            document.querySelector('#rbtMasculino').checked = true;
        break;
    }


    console.log(usuario_normal);

};

llenar_campos();