'use strict';

let conectado = sessionStorage.getItem('conectado');
let tipo_usuario = sessionStorage.getItem('tipo_usuario');
let identificacion_usuario_logueado = sessionStorage.getItem('identificacion');

let obtener_caracteristicas_seleccionadas = () => {
    let caracteristicasSeleccionadas = document.querySelectorAll('#contenedorCaracteristicas input[type=checkbox]:checked');
    let arrayCaracteristicas = [];

    if(caracteristicasSeleccionadas){
        for(let i = 0; i < caracteristicasSeleccionadas.length; i++){
            let vehiculo_caracteristica_id = caracteristicasSeleccionadas[i].id;
            let vehiculo_caracteristica = caracteristicasSeleccionadas[i].value;
            arrayCaracteristicas[i] = {vehiculo_caracteristica_id, vehiculo_caracteristica};
        }
    }

    return arrayCaracteristicas;
};

let listar_vehiculos = async() => {
    let vehiculos;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar/vehiculos',
        responseType: 'json'
    }).then(function(res) {
        console.log(res);
        vehiculos = res.data.lista_vehiculos;
    })
    .catch(function(error) {
        console.log(error);
        Swal.fire({
            'title': 'Sus datos no se pudieron listar',
            'text': 'Ocurrió un error de conexión',
            'icon': 'error'
        });
    });

    return vehiculos;
};

let listar_vehiculos_usuario_logueado = async() => {
    let lista_vehiculos = [];
    let usuario_logueado;

    switch(tipo_usuario){
        case 'normal':
            usuario_logueado = await obtener_usuario_normal_id(identificacion_usuario_logueado);
            break;
        case 'especializado':
            usuario_logueado = await obtener_usuario_especializado_id(identificacion_usuario_logueado);
            break;
        case 'ruta':
            usuario_logueado = await obtener_usuario_ruta_id(identificacion_usuario_logueado);
            break;
        default:
            console.log("No se encontro el usuario");
            break;
    }

    if(usuario_logueado){
        let placas_vehiculos = usuario_logueado.vehiculos;

        for(let i = 0; i < placas_vehiculos.length; i++){
            let vehiculo = await obtener_vehiculo_por_placa(placas_vehiculos[i].placa);
            lista_vehiculos.push(vehiculo);
        }
    }

    return lista_vehiculos;
}


let registrar_vehiculo = async() => {
    let vehiculo_registrado = false;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar/vehiculo',
        headers: {},
        data: {
            numeroPlaca: txtPlaca.value.toUpperCase(),
            marca: primera_letra_mayuscula(txtMarca.value),
            modelo: primera_letra_mayuscula(txtModelo.value),
            annoModelo: txtAnnoModelo.value,
            color: primera_letra_mayuscula(txtColor.value),
            caracteristicas: obtener_caracteristicas_seleccionadas()
        }   
    })
    .then(function(response) {
        console.log(response);
        if(response.data.resultado){
            vehiculo_registrado = true;
        }
    })
    .catch(function(error) {
        console.log(error);
    });

    return vehiculo_registrado;
};

let obtener_vehiculo_por_placa = async(placa_vehiculo) => {
    try {
        const response = await axios({
            method: 'get',
            params: { numeroPlaca: placa_vehiculo },
            url: 'http://localhost:3000/api/buscar/vehiculo',
            responseType: 'json'
        });
        return response.data.vehiculo;
    } catch (error) {
        console.log(error);
    }
};

let actualizar_vehiculo = async() => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar/vehiculo',
        headers: {},
        data: {
          _id: id,
          numeroPlaca: txtPlaca.value.toUpperCase(),
          marca: primera_letra_mayuscula(txtMarca.value),
          modelo: primera_letra_mayuscula(txtModelo.value),
          annoModelo: txtAnnoModelo.value,
          color: primera_letra_mayuscula(txtColor.value),
          caracteristicas: obtener_caracteristicas_seleccionadas()
        }   
    })
    .then(function(res) {
        console.log(res);
        if(res.data.resultado){
            Swal.fire({
                'title': 'Proceso realizado con éxito',
                'text': 'Sus datos fueron modificados',
                'icon': 'success'
            })
            .then(function() {
                window.location.href = 'admin-listar-vehiculo.html';
            });
        } else {
            Swal.fire({
                'title': 'Error al modificar el vehiculo',
                'text': 'No fue posible modificar el vehiculo',
                'icon': 'warning'
            });
        }
    })
    .catch(function(err) {
        console.log(err);
    });
};



let registrar_vehiculo_usuario = async(id, vehiculos) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar/usuario-normal',
        headers: {},
        data: {
          _id: id,
          vehiculos: vehiculos
        }   
    })
    .then(function(res) {
        console.log(res);
        if(res.data.resultado){
            Swal.fire({
                'title': 'Vehículo registrado',
                'text': 'El vehículo fue registrado a su nombre exitosamente',
                'icon': 'info'
            });
            limpiar();
        } else {
            Swal.fire({
                'title': 'Error al registrar el vehiculo',
                'text': 'No fue posible registrar el vehículo',
                'icon': 'warning'
            });
        }
    })
    .catch(function(err) {
        console.log(err);
    });
};

let listar_usuarios = async() => {
    let usuarios_normales;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar/usuarios-normales',
        responseType: 'json'
    }).then(function(res) {
        console.log(res);
        usuarios_normales = res.data.lista_usuarios_normales;
    })
    .catch(function(err) {
        console.log(err);
    });

    return usuarios_normales;
};

let obtener_usuario_actual = async() => {
    let identificacion = identificacion_usuario_logueado;
    let propietario;

    let pUrl = 'http://localhost:3000/api/obtener/propietario-vehiculo/' + identificacion;

    await axios({
        method: 'get',
        url: pUrl,
        responseType: 'json'
    })
    .then(function(response) {
        if(response.data.existe){
            propietario = response.data.propietario
        }
    })
    .catch(function(error) {
        console.log(error);
    });

    return propietario;
};

let enviar_notificacion = () => {};