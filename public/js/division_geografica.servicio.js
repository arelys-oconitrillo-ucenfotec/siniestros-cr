'use strict'

const data = obtener_division_geografica();
const division_geografica = JSON.parse(data);

let obtener_html_cantones = (p_provincia) => {
    let cantones = obtener_cantones(p_provincia);
    let cantones_html = '<option value="">Seleccione</option>';

    for(let i = 0; i < cantones.length; i++){
        cantones_html += '<option value="' + cantones[i].title + '">' + cantones[i].title + '</option>';
    }

    return cantones_html;
};

let obtener_html_distritos = (p_provincia, p_canton) => {
    let distritos = obtener_distritos(p_provincia, p_canton);
    let distritos_html = '<option value="">Seleccione</option>';

    for(let i = 0; i < distritos.length; i++){
        distritos_html += '<option value="' + distritos[i].title + '">' + distritos[i].title + '</option>';
    }

    return distritos_html;
};

let obtener_distritos = (p_provincia, p_canton) => {
    let cantones = obtener_cantones(p_provincia);
    let distritos = [];

    for(let i = 0; i < cantones.length; i++){
        if(cantones[i].title == p_canton){
            let objeto_distritos = cantones[i].distritos;

            for(let j = 0; j < objeto_distritos.length; j++){
                distritos.push(objeto_distritos[j]);
            }
        }
    }

    return distritos;
};

let obtener_cantones = (p_provincia) => {
    let provincias = division_geografica.provincias;
    let cantones = [];

    for(let i = 0; i < provincias.length; i++){
        if(provincias[i].title == p_provincia){
            let objeto_cantones = provincias[i].cantones;

            for(let j = 0; j < objeto_cantones.length; j++){
                cantones.push(objeto_cantones[j]);
            }
        }
    }

    return cantones;
};