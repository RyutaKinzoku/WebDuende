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
    modificar(publicacion){
        const form = new FormData();
        form.append('idPublicacion', publicacion.id);
        form.append('imagen', publicacion.imagen);
        form.append('descripcion', publicacion.descripcion);
        form.append('tags', publicacion.tags);
        form.append('categoria', publicacion.categoria);
        form.append('subcategoria', publicacion.subcategoria);
        for (var pair of form.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        return axios.put('/api/modificarPublicacion', form, {
            headers: config.headers,
        })
    }
    eliminar(idPublicacion){
        let values = {
            idPublicacion: idPublicacion
        }
        return axios.post('/api/eliminarPublicacion', values);
    }
    obtener(idPublicacion){
        return axios.get('/api/obtenerPublicacion', {params: {idPublicacion: idPublicacion}});
    }
    agregar(publicacion){
        const form = new FormData();
        form.append('id',publicacion.id);
        form.append('imagen', publicacion.imagen);
        form.append('descripcion', publicacion.descripcion);
        form.append('tags', publicacion.tags);
        form.append('categoria', publicacion.categoria);
        form.append('subcategoria', publicacion.subcategoria);
        return axios.post('/api/agregarPublicacion', form, {
            headers: config.headers,
        })
    }
    async obtenerLista(idCategoria = null){
        var idsPublicacion = await axios.get('/api/listaPublicaciones', {params: {idCategoria: idCategoria}});
        var publicaciones = [];
        for(var p of idsPublicacion.data) {
            var responseC = await axios.get('/api/obtenerCategoria',{params: {idCategoria: p.idCategoria} });
            var responseS = await axios.get('/api/obtenerSubcategoria',{params: {idSubcategoria: p.idSubcategoria} });
            if(responseC.data.length>0){
                if(responseS.data.length>0){
                    publicaciones.push(new Publicacion(p.id, p.imagen, p.descripcion, p.tags, responseC.data[0].nombre, responseS.data[0].nombre));
                } else{
                    publicaciones.push(new Publicacion(p.id, p.imagen, p.descripcion, p.tags, responseC.data[0].nombre, "NA"));
                }
            }
        }
        return publicaciones;
    }
    async getNext(){
        var response = await axios.get('/api/getIdPublicacion');
        return response.data[0].ultimo_valor;
    }
    setNext(){
        return axios.post('/api/setIdPublicacion');
    }
}