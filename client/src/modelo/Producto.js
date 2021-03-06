export default class Producto {
    constructor(id, nombre, descripcion, precio, cantidad, imagen){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
        this.imagen = imagen;
    }

    set id(idProducto){
        this._id = idProducto;
    }

    get id(){
        return this._id;
    }

    get nombre(){
        return this._nombre;
    }

    set nombre(nombre){
        this._nombre = nombre;
    }

    get descripcion(){
        return this._descripcion;
    }

    set descripcion(descripcion){
        this._descripcion = descripcion;
    }

    get precio(){
        return this._precio;
    }

    set precio(precio){
        this._precio = precio;
    }

    get cantidad(){
        return this._cantidad;
    }

    set cantidad(cantidad){
        this._cantidad = cantidad;
    }

    get imagen(){
        return this._imagen;
    }

    set imagen(imagen){
        this._imagen = imagen;
    }
}