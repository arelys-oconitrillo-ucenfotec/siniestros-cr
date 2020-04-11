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
}

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
            Swal.fire({
                'title': 'Proceso realizado con éxito',
                'text': 'Sus datos se enviaron adecuadamente',
                'icon': 'success'
            }).then(() => {
                limpiar();
            });
        } else {
            Swal.fire({
                'title': 'Sus datos no se pudieron enviar',
                'text': 'Ocurrió un error, es posible que sus datos sean incorrectos o ya existen',
                'icon': 'warning'
            });
        }
        
    })
    .catch(function(error) {
        console.log(error);
        Swal.fire({
            'title': 'Sus datos no se pudieron guardar',
            'text': 'Ocurrió un error de conexión',
            'icon': 'error'
        });
    });
}