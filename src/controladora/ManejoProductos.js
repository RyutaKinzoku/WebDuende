import Producto from "../modelo/Producto";
import GestorProductos from "../DAO/GestorProductos"

export default class ManejoProductos {
    constructor(){
        this.gestorProductos = new GestorProductos();
    }
    
    async obtenerProductos(){
        return this.gestorProductos.obtenerLista()
    }
    
    obtenerProducto(idProducto){
        return this.gestorProductos.obtener(idProducto);
    }

    async agregarProducto(nombre, descripcion, precio, cantidad, imagen){
        var producto = new Producto(0, nombre, descripcion, precio, cantidad, imagen[0]);
        this.gestorProductos.setNext();
        producto.id = await this.gestorProductos.getNext()
        return this.gestorProductos.agregar(producto);
    }

    eliminarProducto(idProducto){
        return this.gestorProductos.eliminar(idProducto);
    }

    modificarProducto(idProducto, nombre, descripcion, precio, cantidad, imagen){
        var producto = new Producto(idProducto, nombre, descripcion, precio, cantidad, imagen);
        return this.gestorProductos.modificar(producto);
    }
}