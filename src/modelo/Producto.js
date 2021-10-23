class Producto {
    constructor(nombre, descripcion, precio, imagen){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
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