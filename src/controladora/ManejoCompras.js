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

    obtenerOrden(idOrden){
        return this.gestorOrdenes.obtener(idOrden);
    }

    async comprar(correo, comprobante, direccion){
        var productos = await this.obtenerProductosCarrito(correo); //Map<idProducto: int, cantidad: int>
        return this.agregarOrden(productos, correo, comprobante, direccion);
    }

    async agregarOrden(productos, correo, comprobante, direccion){
        var orden = new OrdenCompra(0, comprobante, direccion, correo, productos);
        this.gestorOrdenes.setNext();
        orden.id = await this.gestorOrdenes.getNext();
        return this.gestorOrdenes.agregar(orden);
    }

    eliminarOrden(idOrden){
        return this.gestorOrdenes.eliminar(idOrden);
    }
}