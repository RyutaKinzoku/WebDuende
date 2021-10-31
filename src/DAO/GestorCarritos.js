import GestorDB from "./GestorBD";
import Producto from "../modelo/Producto";
import Carrito from "../modelo/Carrito";
import axios from "axios"; 

export default class GestorCarritos{
    modificar(carrito){}
    eliminarCarrito(correo){
        return axios.post('http://localhost:3001/api/eliminarCarrito',correo);
    }
    obtenerCarrito(correo){
        return axios.post('http://localhost:3001/api/eliminarCarrito',correo);
    }
    agregar(carrito){} 

    async obtenerLista(correo){
        var idsProducto = await axios.get('http://localhost:3001/ap1/obtenerProductosCarrito', {params: {correo: correo}});
        var productos = [];
        idsProducto.data.forEach(tupla => {
            let [idProducto, cantidad] = tupla;
            var producto = axios.get('http://localhost:3001/api/obtenerProducto', {params: {idProducto: idProducto} });
            productos.push(new Producto(producto.id, producto.nombre, producto.descripcion, producto.precio, cantidad, producto.imagen));
        });
        return productos;
    }
    agregarProducto(carrito){
        let values = {
            correo: carrito.correo,
            idProducto: carrito.idProducto,
            cantidad: carrito.cantidad,
        }
        return axios.post('http://localhost:3001/api/agregarProductoCarrito',values);
    }
    eliminarProducto(productoEnCarrito){
        let values = {
            correo: productoEnCarrito.correo,
            idProducto: productoEnCarrito.idProducto,
        }
        return axios.post('http://localhost:3001/api/eliminarProductoCarrito',values);
    }
}