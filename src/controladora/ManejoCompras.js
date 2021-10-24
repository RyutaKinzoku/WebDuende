import Carrito from "../modelo/Carrito";
import OrdenCompra from "../modelo/OrdenCompra";

export default class ManejoCompras{
    constructor(){
        this.gestorCarritos = new GestorCarritos();
        this.gestorOrdenes =  new GestorOrdenes();
    }

    obtenerCarrito(correo){
        return this.gestorCarritos.obtener(correo);
    }

    obtenerProductosCarrito(correo){
        var carrito = obtenerCarrito(correo);
        return carrito.productos;
    }

    agregarProductoCarrito(correo, idProducto, cantidad){
        if(obtenerCarrito(correo) === null){
            var carrito = new Carrito(correo, producto, cantidad);
            this.gestorCarritos.agregar(carrito);
        } else {
            this.gestorCarritos.agregarProducto(correo, idProducto);
        }
    }

    eliminarProductoCarrito(correo, idProducto){
        this.gestorCarritos.eliminar(correo, idProducto)
    }

    eliminarCarrito(correo){
        this.gestorCarritos.eliminar(correo);
    }

    comprar(correo, comprobante, direccion){
        var productos = obtenerCarrito(correo).productos; //Map<idProducto: int, cantidad: int>
        crearOrden(productos, correo, comprobante, direccion);
        eliminarCarrito(correo);
    }

    obtenerOrdenes(){
        return this.gestorOrdenes.obtenerLista();
    }

    obtenerOrden(idOrden){
        return this.gestorOrdenes.obtener(idOrden);
    }

    crearOrden(idsProductos, correo, comprobante, direccion){
        var orden = new OrdenCompra(this.gestorOrdenes.getNext(), comprobante, direccion, correo, idsProductos);
        this.gestorOrdenes.agregar(orden);
    }

    eliminarOrden(idOrden){
        this.gestorOrdenes.eliminar(idOrden);
    }
}