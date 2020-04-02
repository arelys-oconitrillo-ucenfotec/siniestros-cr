'use strict';

const pvehiculo = document.getElementById("pvehiculo");
const pmarcas = document.getElementById("pmarcas");
const pmodelos = document.getElementById("pmodelos");

let botonRegistrar = document.querySelector('#btnRegistrar');



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

let validar = () => {
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

    error = validarEmail(error);

    return error;
}

botonRegistrar.addEventListener('click', agregar_vehiculo);
