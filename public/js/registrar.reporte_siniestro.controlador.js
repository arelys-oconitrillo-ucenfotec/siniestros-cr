'use strict';

const sltRuta = document.querySelector('#sltRuta');
const sltSiniestro = document.querySelector('#sltSiniestro');
const botonReportar = document.querySelector('#btnReportar');

let mostrar_rutas = async() => {
    let rutas = await listar_rutas();
    sltRuta.innerHTML = '<option value="">Seleccione</option>';

    for (let i = 0; i < rutas.length; i++) {
        let id = rutas[i]['_id'];
        let nombre_ruta = rutas[i]['nombre_ruta'];

        let opcionRuta = document.createElement('option');
        opcionRuta.id = id;
        opcionRuta.value = nombre_ruta;
        opcionRuta.innerText = nombre_ruta;

        sltRuta.appendChild(opcionRuta);
    }
};

let mostrar_siniestros = async() => {
    let siniestros = await listar_tipo_incidentes();
    sltSiniestro.innerHTML = '<option value="">Seleccione</option>';

    for (let i = 0; i < siniestros.length; i++) {
        let id = siniestros[i]['_id'];
        let nombre_siniestro = siniestros[i]['nombre_siniestro'];

        let opcionSiniestro = document.createElement('option');
        opcionSiniestro.id = id;
        opcionSiniestro.value = nombre_siniestro;
        opcionSiniestro.innerText = nombre_siniestro;

        sltSiniestro.appendChild(opcionSiniestro);
    }
};

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-reporte-siniestro [required]');
    let error = false;

    for (let i = 0; i < campos_requeridos.length; i++) {
        let label_campo_requerido = document.querySelector('[for="' + campos_requeridos[i].id + '"]');
        if (campos_requeridos[i].value == '') {
            label_campo_requerido.classList.add('label-error');

            if (campos_requeridos[i].id == 'txtDescripcion'){
                campos_requeridos[i].classList.add('input-error');
            }

            error = true;
        } else {
            label_campo_requerido.classList.remove('label-error');

            if (campos_requeridos[i].id == 'txtDescripcion'){
                campos_requeridos[i].classList.remove('input-error');
            }
        }
    }

    return error;
      
};


/*let limpiar = () => {
    txtPlaca.value = '';
    txtMarca.value = '';
    txtModelo.value = '';
    txtAnnoModelo.value = '';
    txtColor.value = '';
    let rutas = document.querySelectorAll('#sltRutas input[type=checkbox]');
    for(let i = 0; i < rutas.length; i++){
        rutas[i].checked = false;
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

botonReportar.addEventListener('click', agregar_vehiculo);*/

ready(function() {
    mostrar_rutas();
    mostrar_siniestros();
});
