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

}