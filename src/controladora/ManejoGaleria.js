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

    obtenerPublicaciones(idCategoria = null){
        return this.gestorPublicaciones.obtenerLista(idCategoria);
    }

    /*obtenerPublicaciones(idCategoria = null){
        var publicaciones = this.gestorPublicaciones.obtenerLista();
        publicaciones.forEach(publicacion => {
            publicacion.categoria = this.gestorCategorias.obtenerPublicaciones.idCategoria
        });
    }*/

    agregarPublicacion(imagen, descripcion, tags, idCategoria, idSubcategoria = null){
        let idPublicacion = this.gestorPublicaciones.getNext();
        let publicacion = new Publicacion(idPublicacion,imagen,descripcion,tags,idCategoria,idSubcategoria);
        this.gestorPublicaciones.agregar(publicacion);
    }

    modificarPublicacion(idPublicacion, imagen, descripcion, tags, idCategoria, idSubcategoria = null){
        let publicacion = new Publicacion(idPublicacion, imagen, descripcion, tags, idCategoria, idSubcategoria);
        this.gestorPublicaciones.modificar(publicacion);
    }

    eliminarPublicacion(idPublicacion){
        this.gestorPublicaciones.eliminar(idPublicacion);
    }

    async obtenerCategorias(){
        return this.gestorCategorias.obtenerLista();
    }

    async agregarCategoria(nombre){
        let idCategoria = await this.gestorCategorias.getNext();
        let categoria = new Categoria(idCategoria,nombre, null);
        return this.gestorCategorias.agregar(categoria);
    }

    eliminarCategoria(idCategoria){
        this.gestorCategorias.eliminar(idCategoria);
    }

    modificarCategoria(idCategoria, nombre){
        let categoria = new Categoria(idCategoria,nombre,null)
        this.gestorCategorias.modificar(categoria);
    }

    agregarSubcategoria(idCategoria, nombre){
        let idSubcategoria = this.gestorSubcategorias.getNext();
        let subcategoria = new Subcategoria(idSubcategoria,nombre,idCategoria);
        this.gestorSubcategorias.agregar(subcategoria);
    }

    eliminarSubcategoria(idSubcategoria){
        return this.gestorSubcategorias.eliminar(idSubcategoria);
    }

    modificarSubcategoria(idSubcategoria, nombre, idCategoria){
        let subcategoria = new Categoria(idSubcategoria,nombre,idCategoria);
        this.gestorSubcategorias.modificar(subcategoria);
    }
}