'use strict'

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
            window.location.href = '../usuario-listar-tarjetas.html';
        });
    
    }).catch((err) => {
        console.log(err);
    });

};