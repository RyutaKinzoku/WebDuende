export default class ManejoGaleria{
    constructor(){
        this.gestorPublicaciones = new GestorPublicaciones();
        this.gestorCategorias = new GestorCategorias();
        this.gestorSubcategorias = new GestorSubcategorias();
    }

    obtenerPublicaciones(idCategoria = null){
        var publicaciones = this.gestorPublicaciones.obtenerLista();
        publicaciones.forEach(publicacion => {
            publicacion.categoria = 
        });
    }

    crearPublicacion(imagen, descripcion, tags, idCategoria, idSubcategoria){}
}