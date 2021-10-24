export default class Subcategoria{
    constructor (id, nombre, idCategoria){
        this.id = id;
        this.idCategoria = idCategoria;
        this.nombre = nombre;
    }

    set id(idSubcategoria){
        this.id = idSubcategoria;
    }

    get id(){
        return this.id;
    }

    set idCategoria(idCategoria){
        this.idCategoria = idCategoria;
    }

    get idCategoria(){
        return this.idCategoria;
    }

    get nombre(){
        return this.nombre;
    }

    set nombre (nombre){
        this.nombre = nombre
    }
}