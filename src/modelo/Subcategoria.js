export default class Subcategoria{
    constructor (id, nombre, idCategoria){
        this.id = id;
        this.idCategoria = idCategoria;
        this.nombre = nombre;
    }

    set id(idSubcategoria){
        this._id = idSubcategoria;
    }

    get id(){
        return this._id;
    }

    set idCategoria(idCategoria){
        this._idCategoria = idCategoria;
    }

    get idCategoria(){
        return this._idCategoria;
    }

    get nombre(){
        return this._nombre;
    }

    set nombre (nombre){
        this._nombre = nombre
    }
}