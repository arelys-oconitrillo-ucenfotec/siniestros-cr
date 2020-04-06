'use strict';

let botonReservar = document.querySelector('#btnReservar');
botonReservar.addEventListener('click', obtenerDatos);

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-reservaciones [required]');
    let input_tipo_moneda = document.querySelector('#tipo-moneda input[type=radio]:checked');
    let input_terminos = document.querySelector('#terminos input[type=checkbox]:checked');
    let error = false;

    for (let i = 0; i < campos_requeridos.length; i++) {
        if (campos_requeridos[i].value == '') {
            campos_requeridos[i].classList.add('input-error');
            error = true;
        } else {
            campos_requeridos[i].classList.remove('input-error');
        }
    }

    if (!input_tipo_moneda) {
        error = true;
        document.querySelector('#tipo-moneda').classList.add('input-error');
    } else {
        document.querySelector('#tipo-moneda').classList.remove('input-error');
    }

    return error;
      
};

let limpiar = () => {
    txtNombre.value = "";
    txtEntrada.value = "";
    txtSalida.value = "";
    txtEmail.value = "";
    txtTelefono.value = "";
    rbtDolares.checked = false;
    rbtColones.checked = false;
    rbtEuros.checked = false;
    chbTerminos.checked = false;
};

function obtenerDatos(){
    let error = validar();
    if (error) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        console.log(txtNombre.value);
        console.log(txtEntrada.value);
        console.log(txtSalida.value);
        console.log(txtEmail.value);
        console.log(txtTelefono.value);
        console.log(rbtDolares.value);
        console.log(rbtColones.value);
        console.log(rbtEuros.value);
        console.log(terminos.value);
        Swal.fire({
            'title': 'Proceso realizado con éxito',
            'text': 'Sus datos se enviaron adecuadamente',
            'icon': 'success'
        }).then(() => {
            limpiar();
        });

    }

};
