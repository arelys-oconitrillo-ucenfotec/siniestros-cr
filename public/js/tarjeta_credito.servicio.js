'use strict'

let listar_usuarios_normal_tarjeta = async() => {
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
        Swal.fire({
            'title': 'No se listaron los usuarios con tarjeta',
            'text': 'Ocurrió un error de conexión',
            'icon': 'error'
        });
    });

    return usuarios_normales;
};


let obtener_usuario_normal_id = async(identificacion) => {
    try {
        const response = await axios({
            method: 'get',
            params: { identificacion: identificacion },
            url: 'http://localhost:3000/api/buscar/usuario-normal',
            responseType: 'json'
        });
        return response.data.usuario_normal;
    } catch (error) {
        console.log(error);
    }
};

let obtener_usuario_especializado_id = async(identificacion) => {
    try {
        const response = await axios({
            method: 'get',
            params: { identificacion: identificacion },
            url: 'http://localhost:3000/api/buscar/usuario-especializado',
            responseType: 'json'
        });
        return response.data.usuario_especializado;
    } catch (error) {
        console.log(error);
    }
};

let obtener_usuario_ruta_id = async(identificacion) => {
    try {
        const response = await axios({
            method: 'get',
            params: { identificacion: identificacion },
            url: 'http://localhost:3000/api/buscar/usuario-ruta',
            responseType: 'json'
        });
        return response.data.usuario_ruta;
    } catch (error) {
        console.log(error);
    }
};

let registrar_tarjeta_credito = async (ptipoTarjeta, pnumeroTarjeta, pfechaExp, pcodigoCVV) => {
    await axios({
        method: 'post',
        url : 'http://localhost:3000/api/agregar/tarjeta',
        reponseType: 'json',
        data: {
            'identificacion' : localStorage.getItem('identificacion'),
            'tipoTarjeta' : ptipoTarjeta,
            'numeroTarjeta' : pnumeroTarjeta,
            'fechaExp' : pfechaExp,
            'codigoCVV' : pcodigoCVV
        }
    }).then((res)=> {
        if (res.data.resultado == false) {
            switch(res.data.err.code){

                case 11000:
                    swal.fire({
                        title: 'No se han podido registrar la tarjeta',
                        text: 'Ya existe ese número de tarjeta, por favor revise si la numeración esta bien',
                        icon: 'warning'
                    });
                    break;
            }
        }
    }).catch((err) => {
        console.log(err);
    });

};

let modificar_tarjeta_credito = async (p_id, p_tarjetaId, ptipoTarjeta, pnumeroTarjeta, pfechaExp, pcodigoCVV) => {

    await axios({
        method: 'put',
        url : 'http://localhost:3000/api/modificar/tarjeta',
        reponseType: 'json',
        data: {
            '_id': p_id,
            'p_tarjetaId' : p_tarjetaId,
            'tipoTarjeta' : ptipoTarjeta,
            'numeroTarjeta' : pnumeroTarjeta,
            'fechaExp' : pfechaExp,
            'codigoCVV' : pcodigoCVV
        }
    }).then((res)=> {
        swal.fire({
            title: 'El proceso se realizó correctamente',
            text: 'Sus datos han sido modificados',
            icon: 'success'
        }).then(() => {
            window.location.href = 'usuario-listar-tarjeta.html';
        });
    
    }).catch((err) => {
        console.log(err);
    });

};