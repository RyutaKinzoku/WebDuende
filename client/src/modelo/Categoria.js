export default class Categoria{
    constructor (id, nombre, subcategorias = null){
        this.id = id;
        this.nombre = nombre;
        this.subcategorias = subcategorias;
    }

    set id(idCategoria){
        this._id = idCategoria;
    }

    get id (){
        return this._id;
    }

    get nombre(){
        return this._nombre;
    }

    set nombre (nombre){
        this._nombre = nombre
    }

    get subcategorias(){
        return this._subcategorias;
    }

    set subcategorias (subcategorias){
        this._subcategorias = subcategorias
    }
}