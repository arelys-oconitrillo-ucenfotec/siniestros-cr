'use strict'

const input_Correo = document.getElementById('txtCorreo');
const input_Identificacion = document.getElementById('txtIdentificacion');
const botonGenerar = document.getElementById('btnGenerarClave');
//const botonOlvidoContrasena = document.getElementById('btnOlvidoContrasena');
const botonCancelar = document.getElementById('btnCancelar');
let contrasenaNueva ="";
let _id = "";

function generarContrasenaNueva () {
    let correo = input_Correo.value; 
    let identificacion = input_Identificacion.value;

    let errorBlancos = validarCampos(correo, identificacion);
    let usuarioAceptado = false;
    let existeU = existeUsuario(identificacion);
    
    if ((errorBlancos) || (existeU)) {
        if(errorBlancos){
            Swal.fire({
                'title': 'Sus datos no se pueden validar',
                'text': 'Revisar que los datos esten bien',
                'icon': 'warning'
        });
        }
        if (existeU) {

            contrasenaNueva = crearContrasena();
            _id = obtener_id ();
            guardar_contrasena(_id, identificacion, correo, contrasenaNueva);
                Swal.fire({
                    'title': 'Sus Clave fue generada exitósamente',
                    'text': 'Revise su correo con la nueva clave',
                    'icon': 'success'
                });
                
        } else {
            
            Swal.fire({
                'title': 'La Identifiación no pertenece a ningun usuario registriado',
                'text': 'Revisar y los campos resaltados en ROJO',
                'icon': 'warning'
            });
            input_Identificacion.classList.add('input-error');
        }
        
    }
    window.location.href = 'registrar-usuarios-normales.html'; 
};

let  existeUsuario = async () => {
    let usuario = await obtener_usuario_normal_identificacion(input_Identificacion.value);
    let error = false;
    console.log(usuario);

    if(usuario) {
        error = true;    
    }else {
        return error;
    }
    return error;
};

let obtener_id = async () => {
    _id = await obtener_usuario_normal_id (input_Identificacion.value);
}

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


let cancelar = () => {
    window.location.href = 'bienvenido-sesion.html';
};

botonGenerar.addEventListener('click', generarContrasenaNueva);

botonCancelar.addEventListener('click', cancelar);

