'use strict';
let listar_usuarios = async() => {
    let usuarios;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-usuarios',
        responseType: 'json'
    }).then(function(res) {
        console.log(res);
        usuarios = res.data.lista_usuarios;
    })
    .catch(function(err) {
        console.log(err);
    });

    return usuarios;
};
