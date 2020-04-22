'use strict';

let placa_vehiculo = localStorage.getItem('placa_vehiculo');
let id;
const input_numero_placa = document.querySelector('#txtPlaca');
const input_marca = document.querySelector('#txtMarca'); 
const input_modelo = document.querySelector('#txtModelo'); 
const input_annoModelo = document.querySelector('#txtAnnoModelo');
const input_color = document.querySelector('#txtColor');
const contenedorCaracteristicas = document.querySelector('#contenedorCaracteristicas'); 

let llenar_campos = async() => {
    let vehiculo = await obtener_vehiculo_por_placa(placa_vehiculo);

    id = vehiculo._id; 
    input_numero_placa.value = vehiculo.numeroPlaca;
    input_marca.value = vehiculo.marca;
    input_modelo.value = vehiculo.modelo;
    input_annoModelo.value = vehiculo.annoModelo;
    input_color.value = vehiculo.color;

    mostrar_caracteristicas()
    .then (() => {
        marcar_caracteristicas(vehiculo.caracteristicas);
    });
    
};

let validar = (pCamposRequeridos) => {
    let campos_requeridos = pCamposRequeridos;
    let error = false;

    for (let i = 0; i < campos_requeridos.length; i++) {
        let label_campo_requerido = document.querySelector('[for="' + campos_requeridos[i].id + '"]');
        if (campos_requeridos[i].value == '') {
            label_campo_requerido.classList.add('label-error');

            if (campos_requeridos[i].id == 'txtInfoAponderado'){
                campos_requeridos[i].classList.add('input-error');
            }
            
            error = true;
        } else {
            label_campo_requerido.classList.remove('label-error');
            
            if (campos_requeridos[i].id == 'txtInfoAponderado'){
                campos_requeridos[i].classList.remove('input-error');
            }
        }
    }

    return error;
      
};

let mostrar_caracteristicas = async() => {
    let caracteristicas = await listar_vehiculo_caracteristicas();
    contenedorCaracteristicas.innerHTML = '';

    for (let i = 0; i < caracteristicas.length; i++) {
        let id = caracteristicas[i]['_id'];
        let value = caracteristicas[i]['caracteristica'];

        let contenedorCaracteristica = document.createElement('div');
        contenedorCaracteristica.classList.add('form-checkbox');

        let inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.id = id;
        inputCheckbox.name = id;
        inputCheckbox.value = value;

        let lblCheckbox = document.createElement('label');
        lblCheckbox.setAttribute('for', id);
        lblCheckbox.innerText = value;

        contenedorCaracteristica.appendChild(inputCheckbox);
        contenedorCaracteristica.appendChild(lblCheckbox);
        contenedorCaracteristicas.appendChild(contenedorCaracteristica);
    }
};

let marcar_caracteristicas = (pCaracteristicas) => {
    for (let i = 0; i < pCaracteristicas.length; i++){
        let checkBox = document.getElementById(pCaracteristicas[i].vehiculo_caracteristica_id);
        checkBox.checked = true;
    }
};

let modificar_vehiculo = () => {
    let error_validacion = validar(document.querySelectorAll('#frm-vehiculo [required]'));
    if (error_validacion) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        actualizar_vehiculo();
    }
};

llenar_campos();

let botonVehiculo = document.querySelector('#btnVehiculos');
botonVehiculo.addEventListener('click', modificar_vehiculo);