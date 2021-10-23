export default class Subcategoria{
    constructor (id, nombre){
        this.id = id;
        this.nombre = nombre;
    }

    set id(idSubcategoria){
        this.id = idSubcategoria;
    }

    get id(){
        return this.id;
    }

    get nombre(){
        return this.nombre;
    }

    set nombre (nombre){
        this.nombre = nombre
    }
}