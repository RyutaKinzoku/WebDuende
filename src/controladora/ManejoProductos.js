import Producto from "../modelo/Producto";

export default class ManejoProductos {
    constructor(){
        this.gestorProductos = new GestorProductos();
    }
    
    obtenerProductos(){
        return this.gestorProductos.obtenerLista();
    }
    
    obtenerProducto(idProducto){
        return this.gestorProductos.obtener(idProducto);
    }

    crearProducto(nombre, descripcion, precio, imagen, existencias){
        var producto = new Producto(this.gestorProductos.getNext(), nombre, descripcion, precio, imagen, existencias);
        this.gestorProductos.agregar(producto);
    }

    eliminarProducto(idProducto){
        this.gestorProductos.eliminar(idProducto);
    }

    modificarProducto(idProducto, nombre, descripcion, precio, imagen, existencias){
        var producto = new Producto(idProducto, nombre, descripcion, precio, imagen, existencias);
        this.gestorProductos.modificar(producto);
    }
}