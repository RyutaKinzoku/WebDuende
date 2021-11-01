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
        this.gestorCarritos.eliminarCarrito(correo);
    }

    comprar(correo, comprobante, direccion){
        var productos = this.obtenerProductosCarrito(correo).productos; //Map<idProducto: int, cantidad: int>
        this.crearOrden(productos, correo, comprobante, direccion);
        this.gestorCarritos.eliminarCarrito(correo);
    }

    obtenerOrdenes(){
        return this.gestorOrdenes.obtenerLista();
    }

    obtenerOrden(idOrden){
        return this.gestorOrdenes.obtener(idOrden);
    }

    async crearOrden(comprobante, direccion, correo, idsProductos){
        var orden = new OrdenCompra(0, comprobante, direccion, correo, idsProductos);
        this.gestorOrdenes.setNext();
        orden.id = await this.gestorOrdenes.getNext();
        return this.gestorOrdenes.agregar(orden);
    }

    eliminarOrden(idOrden){
        this.gestorOrdenes.eliminar(idOrden);
    }

    obtenerCantidadProductoCarrito(correo, idProducto){
        
    }
}