export default class Publicacion{

    constructor(id, imagen, descripcion, tags, categoria, subcategoria = null){
        this.id = id;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.tags = tags;
        this.categoria = categoria;
        this.subcategoria = subcategoria;
    }

    get id(){
        return this.id;
    }

    get imagen(){
        return this.imagen;
    }

    set imagen(imagen){
        this.imagen = imagen;
    }

    get descripcion(){
        return this.descripcion;
    }

    set descripcion(descripcion){
        this.descripcion = descripcion;
    }

    get tags(){
        return this.tags;
    }

    set tags(tags){
        this.tags = tags;
    }

    get categoria(){
        return this.categoria;
    }

    set categoria(categoria){
        this.categoria = categoria;
    }

    get subcategoria(){
        return this.subcategoria;
    }

    set subcategoria(subcategoria){
        this.subcategoria = subcategoria;
    }
}