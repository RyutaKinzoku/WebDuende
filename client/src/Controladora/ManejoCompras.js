import Carrito from "../modelo/Carrito";
import OrdenCompra from "../modelo/OrdenCompra";
import GestorCarritos from "../DAO/GestorCarritos";
import GestorOrdenes from "../DAO/GestorOrdenes";
export default class ManejoCompras{
    constructor(){
        this.gestorCarritos = new GestorCarritos();
        this.gestorOrdenes =  new GestorOrdenes();
    }

    obtenerCarrito(correo){
        return this.gestorCarritos.obtenerCarrito(correo);
    }

    async obtenerProductosCarrito(correo){
        return this.gestorCarritos.obtenerLista(correo);
    }

    async agregarProductoCarrito(correo, idProducto, cantidad){
        var carrito = new Carrito(correo, idProducto, cantidad);
        return this.gestorCarritos.agregarProducto(carrito);
    }

    eliminarProductoCarrito(correo, idProducto){
        var carrito = new Carrito(correo, idProducto, null);
        return this.gestorCarritos.eliminarProducto(carrito)
    }

    eliminarCarrito(correo){
        var carrito = new Carrito(correo, null, null);
        this.gestorCarritos.eliminarCarrito(carrito);
    }

    //OrdenCompra
    async obtenerOrdenes(){
        return this.gestorOrdenes.obtenerLista();
    }

    obtenerOrden(idOrdenCompra){
        return this.gestorOrdenes.obtener(idOrdenCompra);
    }

    async comprar(correo, comprobante, direccion){
        var productos = await this.obtenerProductosCarrito(correo);
        this.gestorCarritos.actualizarProductos(correo);
        return this.agregarOrden(productos, correo, comprobante, direccion);
    }

    async agregarOrden(productos, correo, comprobante, direccion){
        let id = await this.gestorOrdenes.getNext();
        var orden = new OrdenCompra(id, comprobante[0], direccion, correo, productos);
        return this.gestorOrdenes.agregarOrden(orden);
    }

    async eliminarOrden(idOrden){
        return this.gestorOrdenes.eliminar(idOrden);
    }

    async obtenerProductosOrden(idOrden){
        return this.gestorOrdenes.obtenerProductosOrden(idOrden);
    }
}
