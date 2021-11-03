import GestorDB from "./GestorBD";
import Publicacion from "../modelo/Publicacion";
import axios from "axios";

export default class gestorPublicaciones  extends GestorDB{
    modificar(publicacion){}
    eliminar(idPublicacion){}
    obtener(idPublicacion){}
    agregar(publicacion){}
    async obtenerLista(idCategoria = null){
        var idsPublicacion = await axios.get('http://localhost:3001/api/listaPublicaciones', {params: {idCategoria: idCategoria}});
        var publicaciones = [];
        idsPublicacion.data.forEach(p => {
            publicaciones.push(new Publicacion(p.id, p.imagen, p.descripcion, p.tags, p.categoria, p.subcategoria));
        });
        return publicaciones;
    }
    getNext(){}
}