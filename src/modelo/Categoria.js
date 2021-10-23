export default class Categoria{
    constructor (id, nombre, subcategorias = null){
        this.id = id;
        this.nombre = nombre;
        this.subcategorias = subcategorias;
    }

    set id(idCategoria){
        this.id = idCategoria;
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

    get subcategorias(){
        return this.subcategorias;
    }

    set subcategorias (subcategorias){
        this.subcategorias = subcategorias
    }
}