/*TO DO
hacer las validaciones
hacer el limpiar
funcion para mostrar los campos dependiendo del rol seleccionado
funcion que devuelva un numero random de 5 digitos
funcion que envie un email para la activacion del usuario

'use strict';

/*let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-registro [required]');
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

    if (!input_terminos) {
        error = true;
        document.querySelector('#terminos').classList.add('input-error');
    } else {
        document.querySelector('#terminos').classList.remove('input-error');
    }
    
    error = validarEmail(error);
    error = validarFechas(error);


    return error;
      
};

let validarFechas = (pError) => {
    let arrayEntrada = txtEntrada.value.split("-");
    let arraySalida = txtSalida.value.split("-");
    let fecha_actual = new Date();
    let fecha_entrada = new Date(parseInt(arrayEntrada[0]), parseInt(arrayEntrada[1]) - 1, parseInt(arrayEntrada[2]), 23, 59, 59);
    let fecha_salida = new Date(parseInt(arraySalida[0]), parseInt(arraySalida[1]) - 1, parseInt(arraySalida[2])); 
    let error = pError;

    if(arrayEntrada.length == 3){
        if(fecha_entrada < fecha_actual){
            document.querySelector('#txtEntrada').classList.add('input-error');
            error = true;
        } else{
            document.querySelector('#txtEntrada').classList.remove('input-error');
        }
    }

    if(arraySalida.length == 3){
        if(fecha_salida <= fecha_actual || fecha_salida <= fecha_entrada){
            document.querySelector('#txtSalida').classList.add('input-error');
            error = true;
        } else{
            document.querySelector('#txtSalida').classList.remove('input-error');
        }
    }

    return error;
};

let validarEmail = (pError) => {
    let error = pError;

    if (!error){
        if (txtEmail.value.includes('@')){
            document.querySelector('#txtEmail').classList.remove('input-error');
        }else{
            error = true;
            document.querySelector('#txtEmail').classList.add('input-error');
        }
        
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
};*/

let obtener_datos = async() => {
    //let error_validacion = validar();
    let error_validacion = false;
    if (error_validacion) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        await axios({
            method: 'post',
            url: 'http://localhost:3000/api/registrar-usuario',
            headers: {},
            data: {
                tipo_identificacion: sltTipoIdentificacion.value,
                identificacion: txtIdentificacion.value,
                primer_nombre: txtPrimerNombre.value,
                segundo_nombre: txtSegundoNombre.value,
                primer_apellido: txtPrimerApellido.value,
                segundo_apellido: txtSegundoApellido.value,
                genero: sltGenero.value,
                correo: txtEmail.value,
                telefono: txtTelefono.value,
                fotografia: txtFotografia.value,
                rol: sltRol.value,
                usuario_especializado: 'especializado',
                codigo_activacion: ' ',
                contrasena: ' ',
                estado: 'inactivo'
            }
               
        })
        .then(function (response) {
            console.log(response);
            if(response.data.resultado){
                Swal.fire({
                    'title': 'Proceso realizado con éxito',
                    'text': 'Sus datos se enviaron adecuadamente',
                    'icon': 'success'
                }).then(() => {
                    //limpiar();
                    console.log("limpiar");
                });
            } else {
                Swal.fire({
                    'title': 'No se registró el usuario',
                    'text': 'Ocurrió un error en el servidor',
                    'icon': 'error'
                });
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};

let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtener_datos);

