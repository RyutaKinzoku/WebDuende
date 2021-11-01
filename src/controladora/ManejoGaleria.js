import Publicacion from "../modelo/Publicacion";
import Categoria from "../modelo/Categoria"
import Subcategoria from "../modelo/Subcategoria"
import GestorPublicaciones from "../DAO/GestorPublicaciones";
import GestorCategorias from "../DAO/GestorCategorias";
import GestorSubcategorias from "../DAO/GestorSubcategorias";

export default class ManejoGaleria{
    constructor(){
        this.gestorPublicaciones = new GestorPublicaciones();
        this.gestorCategorias = new GestorCategorias();
        this.gestorSubcategorias = new GestorSubcategorias();
    }

    obtenerPublicaciones(){
        return this.gestorPublicaciones.obtenerPublicaciones();
    }

    /*obtenerPublicaciones(idCategoria = null){
        var publicaciones = this.gestorPublicaciones.obtenerLista();
        publicaciones.forEach(publicacion => {
            publicacion.categoria = this.gestorCategorias.obtenerPublicaciones.idCategoria
        });
    }*/

    agregarPublicacion(imagen, descripcion, tags, idCategoria, idSubcategoria){
        let idPublicacion = this.gestorPublicaciones.getNext();
        let publicacion = new Publicacion(idPublicacion,imagen,descripcion,tags,idCategoria,idSubcategoria);
        this.gestorPublicaciones.agregarPublicacion(publicacion);
    }

    agregarPublicacion(imagen, descripcion, tags, idCategoria){
        let idPublicacion = this.gestorPublicaciones.getNext();
        let publicacion = new Publicacion(idPublicacion,imagen,descripcion,tags,idCategoria, null);
        this.gestorPublicaciones.agregarPublicacion(publicacion);
    }

    modificarPublicacion(idPublicacion, imagen, descripcion, tags, idCategoria, idSubcategoria){
        let publicacion = new Publicacion(idPublicacion, imagen, descripcion, tags, idCategoria, idSubcategoria);
        this.gestorPublicaciones.modificarPublicacion(publicacion);
    }

    modificarPublicacion(idPublicacion, imagen, descripcion, tags, idCategoria){
        let publicacion = new Publicacion(idPublicacion, imagen, descripcion, tags, idCategoria, null);
        this.gestorPublicaciones.modificarPublicacion(publicacion);
    }

    eliminarPublicacion(idPublicacion){
        this.gestorPublicaciones.eliminarPublicacion(idPublicacion);
    }

    async obtenerCategorias(){
        return this.gestorCategorias.obtenerLista();
    }

    agregarCategoria(nombre){
        let idCategoria = this.gestorCategorias.getNext();
        let categoria = new Categoria(idCategoria,nombre, null);
        this.gestorCategorias.agregarCategoria(categoria);
    }

    eliminarCategoria(idCategoria){
        this.gestorCategorias.eliminarCategoria(idCategoria);
    }

    modificarCategoria(idCategoria, nombre){
        let categoria = new Categoria(idCategoria,nombre,null)
        this.gestorCategorias.modificarCategoria(categoria)
    }

    agregarSubcategoria(idCategoria, nombre){
        let idSubcategoria = this.gestorSubcategorias.getNext();
        let subcategoria = new Subcategoria(idSubcategoria,nombre,idCategoria);
        this.gestorSubcategorias.agregarSubcategoria(subcategoria);
    }

    eliminarSubcategoria(idSubcategoria){
        this.gestorSubcategorias.eliminarSubcategoria(idSubcategoria);
    }

    modificarSubcategoria(idSubcategoria, nombre, idCategoria){
        let subcategoria = new Categoria(idSubcategoria,nombre,idCategoria);
        this.gestorSubcategorias.modificarSubcategoria(subcategoria)
    }
}