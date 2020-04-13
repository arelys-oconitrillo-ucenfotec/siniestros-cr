'use strict';

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
    //TO DO: Traer usuario desde la cookie de login, por ahora voy quemarlo aqui
    let id_test = '5e93ca3c5bacb46d1075cc88';
    let propietario;

    let pUrl = 'http://localhost:3000/api/obtener/propietario-vehiculo/' + id_test;

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