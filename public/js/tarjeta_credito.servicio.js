'use strict'

let registrar_tarjetaCredito = async (pidentificacion, ptipoTarjeta, pnumeroTarjeta, pfechaExp, pcodigoCVV) => {

    await axios({
        method: 'post',
        url : 'http://localhost:3000/api/agregar/tarjeta',
        reponseType: 'json',
        data: {
            'identificacion' : pidentificacion,
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

let modificar_tarjetaCredito = async (p_id, pidentificacion, ptipoTarjeta, pnumeroTarjeta, pfechaExp, pcodigoCVV) => {
    await axios({
        method: 'put',
        url : 'http://localhost:3000/api/modificar/tarjeta',
        reponseType: 'json',
        data: {
            '_id': p_id,
            'identificacion' : pidentificacion,
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
            window.location.href = '../usuario-listar-tarjeta.html';
        });
    
    }).catch((err) => {
        console.log(err);
    });

};