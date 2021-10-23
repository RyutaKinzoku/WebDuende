export default class Subcategoria{
    constructor (id, nombre){
        this.id = id;
        this.nombre = nombre;
    }

    get id (){
        return this.id;
    }

    get nombre(){
        return this.nombre;
    }

    set nombre (nombre){
        this.nombre = nombre
    }
}