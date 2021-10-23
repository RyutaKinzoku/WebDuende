export default class Producto {
    constructor(id, nombre, descripcion, precio, imagen, existencias){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.existencias = existencias;
    }

    get id(){
        return this.id;
    }

    get nombre(){
        return this.nombre;
    }

    set nombre(nombre){
        this.nombre = nombre;
    }

    get descripcion(){
        return this.descripcion;
    }

    set descripcion(descripcion){
        this.descripcion = descripcion;
    }

    get precio(){
        return this.precio;
    }

    set precio(precio){
        this.precio = precio;
    }

    get imagen(){
        return this.imagen;
    }

    set imagen(imagen){
        this.imagen = imagen;
    }
}