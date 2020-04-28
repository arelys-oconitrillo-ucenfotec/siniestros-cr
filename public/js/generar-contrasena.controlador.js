'use strict'

const input_Correo = document.getElementById('txtCorreo');
const input_Identificacion = document.getElementById('txtIdentificacion');
const botonGenerar = document.getElementById('btnGenerarClave');
//const botonOlvidoContrasena = document.getElementById('btnOlvidoContrasena');
const botonCancelar = document.getElementById('btnCancelar');
let contrasenaNueva ="";
function recolectarDatos() {
    let correo = input_Correo.value; 
    let identificacion = input_Identificacion.value;

    let errorBlancos = validarCampos(correo, identificacion);
    let usuarioAceptado = false;

    if (errorBlancos) {
        Swal.fire({
            'title': 'Sus datos no se pueden validar',
            'text': 'Revisar los campos resaltados en ROJO',
            'icon': 'warning'
        });
    } else {
        contrasenaNueva = crearContrasena();
        //usuarioAceptado = respuesta.success;
        //if (usuarioAceptado) {
            Swal.fire({
                'title': 'Sus Clave fue generada exitósamente',
                'text': 'Revise su correo para la nueva clave',
                'icon': 'success'
            });
            //window.location.href = 'registar-usuario-normal.html';
        }
};

/* -----------------funcion para generar la clave -------------------------------------*/

// hacer un arreglo con todos los datos Minusculas+Mayusculas+numeros+caracteres especiales, y hacer el random con ellos

function letraMinuscula () { //Esta funcion selecciona una letra minúscula aleatoriamente
    return String.fromCharCode(Math.floor(Math.random() *26) +97);
}; 

function letraMayuscula () { //Esta funcion selecciona una letra mayúscula aleatoriamente
    return String.fromCharCode(Math.floor(Math.random() *26) +65);
};

function numeroAleatorio () { //Esta funcion selecciona un número del 0 al 9 aleatoriamente
    return String.fromCharCode(Math.floor(Math.random() *10) +48);
};

function caracterEspeciales () { //Esta funcion selecciona un caracter espacial aleatoriamente
    const caracter = '!@#$%^&*(){}[]=<>/,.'
    return caracter [Math.floor(Math.random()) * caracter.length];
};
console.log( letraMinuscula(), letraMayuscula(), numeroAleatorio(), caracterEspeciales());

function crearContrasena() {
    let correo = input_Correo.value;
    let identificacion = input_Identificacion.value;
    let minuscula = "";
    let mayuscula = "";
    let numero = "";
    let simbolo = "";
    let largoclave = 10;
    let caracter = "";
    let claveGenerada = "";
    let error = false;
    for (let i=0; i < largoclave; i++) {
        
        let cantidad = i;
        switch (cantidad) {
            case 0:
                minuscula = letraMinuscula();
                caracter = minuscula;
            break;
            case 1:
                mayuscula = letraMayuscula();
                caracter = mayuscula;
            break;
            case 2:
                numero = numeroAleatorio();
                caracter = numero;
            break;
            case 3:
                simbolo = caracterEspeciales();
                caracter = simbolo ;
            break;
            case 4:
                minuscula = letraMinuscula();
                caracter = minuscula;
            break;
            case 5:
                mayuscula = letraMayuscula();
                caracter = mayuscula;
            break;
            case 6:
                numero = numeroAleatorio();
                caracter = numero;
            break;
            case 7:
                minuscula = letraMinuscula();
                caracter = minuscula;
            break;
            case 8:
                simbolo = caracterEspeciales();
                caracter = simbolo;
            break;
            case 9:
                minuscula = letraMinuscula();
                caracter = minuscula;
            break;
          default:
              error = true;
         
        }
        claveGenerada = claveGenerada + caracter;
        caracter = "";
    }
    console.log(claveGenerada, error);
    return claveGenerada
};
/*
    if (errorBlancos) {
        Swal.fire({
            'title': 'Sus datos no se pueden validar',
            'text': 'Revisar los campos resaltados en ROJO',
            'icon': 'warning'
        });
    } else {
        
        usuarioAceptado = respuesta.success;
        if (usuarioAceptado) {
            window.location.href = '';
        } else {
            Swal.fire({
                'title': 'Sus datos no se pueden validar',
                'text': 'Usuario o contraseña incorrectos',
                'icon': 'warning'
            });
        }
    }

};*/

let validarCampos = () => {
    let campos_requeridos = document.querySelectorAll('#frm-registro [required]');
    let error = false;

    for (let i = 0; i < campos_requeridos.length; i++) {
        if (campos_requeridos[i].value == '') {
            campos_requeridos[i].classList.add('input-error');
            error = true;
        } else {
            campos_requeridos[i].classList.remove('input-error');
        }
    }

    /*if (!/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/.test(inputCorreo.value)) {
        input_Correo.classList.add('input-error');
        error = true;
    }*/

    return error;
      
};


let cancelar = () => {
    window.location.href = 'bienvenido-sesion.html';
};

botonGenerar.addEventListener('click', recolectarDatos);

botonCancelar.addEventListener('click', cancelar);

