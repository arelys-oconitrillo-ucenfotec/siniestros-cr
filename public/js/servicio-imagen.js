'use strict';

const boton_foto = document.querySelector('#btn-icono');
const imagen = document.querySelector('#icon-img');

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName : 'arelysoco',
    uploadPreset : 'preset_are'

}, (err, result)=>{
    if(!err && result && result.event == 'success'){
        console.log('Imagen subida con éxito', result.info);
        imagen.src = result.info.secure_url;
    } 
});

boton_foto.addEventListener('click', ()=>{
    widget_cloudinary.open();
}, false);