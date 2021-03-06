'use strict';

obtener_menu();

const contenedorCaracteristicas = document.querySelector('#contenedorCaracteristicas');
const botonRegistrar = document.querySelector('#btnRegistrar');

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

let limpiar = () => {
    txtPlaca.value = '';
    txtMarca.value = '';
    txtModelo.value = '';
    txtAnnoModelo.value = '';
    txtColor.value = '';
    let caracteristicas = document.querySelectorAll('#contenedorCaracteristicas input[type=checkbox]');
    for(let i = 0; i < caracteristicas.length; i++){
        caracteristicas[i].checked = false;
    }
};

let agregar_vehiculo = async () => {
    let errorFrmVehiculo = validar(document.querySelectorAll('#frm-vehiculo [required]'));

    if (errorFrmVehiculo) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        let usuario_actual = await obtener_usuario_actual();
        if(usuario_actual){
            let propietarios_vehiculo = await obtener_propietarios_vehiculo();
            if(propietarios_vehiculo.length > 0){
                //TODO Notificacion a usuarios con vehiculo registrado
                Swal.fire({
                    'title': 'Error de autorización',
                    'text': 'El vehículo placa ' + txtPlaca.value + ' se encuentra registrado',
                    'icon': 'warning'
                });
            } else {
                let vehiculo_registrado = await registrar_vehiculo();

                if(vehiculo_registrado){
                    let vehiculos_usuario_actual = usuario_actual.vehiculos;
                    vehiculos_usuario_actual.push({placa: txtPlaca.value});

                    registrar_vehiculo_usuario(usuario_actual._id, vehiculos_usuario_actual);
                } else {
                    Swal.fire({
                        'title': 'Error al registrar el vehiculo',
                        'text': 'No fue posible registrar el vehículo',
                        'icon': 'warning'
                    });
                }
            }
        } else {
            Swal.fire({
                'title': 'Error de autorización',
                'text': 'Por favor inicie sesion para registrar un vehículo',
                'icon': 'warning'
            });
        }
    }

};

let obtener_propietarios_vehiculo = async() => {
    let propietarios = [];
    let usuarios = await listar_usuarios();

    for(let i = 0; i < usuarios.length; i++){
        let vehiculos_usuario = usuarios[i].vehiculos;
        for(let j = 0; j < vehiculos_usuario.length; j++){
            if(vehiculos_usuario[j].placa == txtPlaca.value){
                propietarios.push(usuarios[i]);
            }
        }
    }

    return propietarios;
};

botonRegistrar.addEventListener('click', agregar_vehiculo);

ready(function() {
    mostrar_caracteristicas();
});
