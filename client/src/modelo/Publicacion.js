export default class Publicacion{

    constructor(id, imagen, descripcion, tags, categoria, subcategoria = null){
        this.id = id;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.tags = tags;
        this.categoria = categoria;
        this.subcategoria = subcategoria;
    }

    set id(idPublicacion){
        this._id = idPublicacion;
    }

    get id(){
        return this._id;
    }

    get imagen(){
        return this._imagen;
    }

    set imagen(imagen){
        this._imagen = imagen;
    }

    get descripcion(){
        return this._descripcion;
    }

    set descripcion(descripcion){
        this._descripcion = descripcion;
    }

    get tags(){
        return this._tags;
    }

    set tags(tags){
        this._tags = tags;
    }

    get categoria(){
        return this._categoria;
    }

    set categoria(categoria){
        this._categoria = categoria;
    }

    get subcategoria(){
        return this._subcategoria;
    }

    set subcategoria(subcategoria){
        this._subcategoria = subcategoria;
    }
}