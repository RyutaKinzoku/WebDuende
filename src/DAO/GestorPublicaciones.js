import GestorDB from "./GestorBD";
import Publicacion from "../modelo/Publicacion";
import axios from "axios";
const FormData = require('form-data');
const config = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
};

export default class gestorPublicaciones  extends GestorDB{
    modificar(publicacion){}
    eliminar(idPublicacion){}
    obtener(idPublicacion){}
    agregar(publicacion){
        console.log(publicacion)
        const form = new FormData();
        form.append('id',publicacion.id);
        form.append('imagen', publicacion.imagen);
        form.append('descripcion', publicacion.descripcion);
        form.append('tags', publicacion.tags);
        form.append('categoria', publicacion.categoria);
        form.append('subcategoria', publicacion.subcategoria);
        return axios.post('http://localhost:3001/api/agregarPublicacion', form, {
            headers: config.headers,
        })
    }
    async obtenerLista(idCategoria = null){
        var idsPublicacion = await axios.get('http://localhost:3001/api/listaPublicaciones', {params: {idCategoria: idCategoria}});
        var publicaciones = [];
        idsPublicacion.data.forEach(p => {
            publicaciones.push(new Publicacion(p.id, p.imagen, p.descripcion, p.tags, p.categoria, p.subcategoria));
        });
        return publicaciones;
    }
    async getNext(){
        var response = await axios.get('http://localhost:3001/api/getIdPublicacion');
        return response.data[0].ultimo_valor;
    }
    setNext(){
        return axios.post('http://localhost:3001/api/setIdPublicacion');
    }
}