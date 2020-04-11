'use strict';

const pvehiculo = document.getElementById("pvehiculo");
const pmarcas = document.getElementById("pmarcas");
const pmodelos = document.getElementById("pmodelos");

const contenedorCaracteristicas = document.querySelector('#contenedorCaracteristicas');
const botonRegistrar = document.querySelector('#btnRegistrar');

function cambio_vehiculo(s1, s2, s3) {
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(s2);
    var s3 = document.getElementById(s3);
    s2.innerHTML = "";
    s3.innerHTML = "";

    if (s1.value == "automovil") {
        var optionArray = ["", "hiunday|Hiunday", "toyota|Toyota", "honda|Honda"];
        var marcasArray = ["", "accent|Accent", "accord|Accord", "hilux|Hilux", "civic|Civic", "corolla|Corolla", "ctro|otro"];


    } else if (s1.value == "motocicleta") {
        var optionArray = ["kawasaky|Kawasaky", "formula|Formula", "honda|Honda"];
        var marcasArray = ["cyclone|Cyclone", "lx|LX", "vulcan|Vulcan", "cbr|CBR", "dominar|Dominar", "tareo|Tareo", "otro|otro"];
    }


    for (var option in optionArray) {

        var pair = optionArray[option].split("|");
        var newOption = document.createElement("option");
        newOption.value = pair[0];
        newOption.innerHTML = pair[1];
        s2.options.add(newOption);

    }
    for (var option in marcasArray) {

        var pair = marcasArray[option].split("|");
        var newOption = document.createElement("option");
        newOption.value = pair[0];
        newOption.innerHTML = pair[1];
        s3.options.add(newOption);

    }

};

let mostrar_caracteristicas = async() => {
    let caracteristicas = await listar_vehiculo_caracteristicas();
    contenedorCaracteristicas.innerHTML = '';

    for (let i = 0; i < caracteristicas.length; i++) {
        let id = caracteristicas[i]['_id'];
        let value = caracteristicas[i]['caracteristica'];

        let inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.id = id;
        inputCheckbox.name = id;
        inputCheckbox.value = value;

        let lblCheckbox = document.createElement('label');
        lblCheckbox.setAttribute('for', id);
        lblCheckbox.innerText = value;

        contenedorCaracteristicas.appendChild(inputCheckbox);
        contenedorCaracteristicas.appendChild(lblCheckbox);
    }
};

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-vehiculo [required]');
    let error = false;

    for (let i = 0; i < campos_requeridos.length; i++) {
        console.log(campos_requeridos[i]);
        let label_campo_requerido = document.querySelector('[for="' + campos_requeridos[i].id + '"]');
        if (campos_requeridos[i].value == '') {
            label_campo_requerido.classList.add('label-error');

            error = true;
        } else {
            label_campo_requerido.classList.remove('label-error');
        }
    }

    return error;
      
};

let limpiar = () => {
    txtPlaca.value = '';
    txtMarca.value = '';
    txtModelo.value = '';
    txtAnnoModelo.value = '';
    txtColor.value = '';
};

let agregar_vehiculo = () => {
    let error = validar();
    if (error) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        registrar_vehiculo();
    }

};

botonRegistrar.addEventListener('click', agregar_vehiculo);

ready(function() {
    mostrar_caracteristicas();
});
