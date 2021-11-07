import GestorDB from "./GestorBD";
import Producto from "../modelo/Producto";
import Carrito from "../modelo/Carrito";
import axios from "axios"; 

export default class GestorCarritos  extends GestorDB{
    agregar(carrito){} 
    modificar(carrito){}
    async eliminarCarrito(carrito){
        let values = {
            correo: carrito.comprador 
        }
        return await axios.post('http://localhost:3001/api/eliminarCarrito',values);
    }
    obtenerCarrito(correo){
        return axios.post('http://localhost:3001/api/obtenerCarrito', {params: {correo: correo}});
    }
    async obtenerLista(correo){
        var idsProducto = await axios.get('http://localhost:3001/api/obtenerProductosCarrito', {params: {correo: correo}});
        var productos = [];
        for(let i=0; i<idsProducto.data.length;i++){
            var tupla = idsProducto.data[i];
            var [idProducto, cantidad] = tupla;
            var producto = (await axios.get('http://localhost:3001/api/obtenerProducto', {params: {idProducto: idProducto} })).data[0];
            var producto2 = new Producto(producto.id, producto.nombre, producto.descripcion, producto.precio, cantidad, producto.imagen)
            productos.push(producto2);
        }
        return productos;
    }

    async actualizarProductos(correo){
        var idsProducto = await axios.get('http://localhost:3001/api/obtenerProductosCarrito', {params: {correo: correo}});
        for(let i=0; i<idsProducto.data.length;i++){
            var tupla = idsProducto.data[i];
            var [idProducto, cantidad] = tupla;
            var producto = (await axios.get('http://localhost:3001/api/obtenerProducto', {params: {idProducto: idProducto} })).data[0];
            var producto2 = new Producto(producto.id, producto.nombre, producto.descripcion, producto.precio, producto.cantidad-cantidad, producto.imagen)
            let values = {
                id: producto2.id,
                cantidad: producto2.cantidad
            }
            axios.put('http://localhost:3001/api/actualizarProducto',values)
        }
    }

    async agregarProducto(carrito){
        let values = {
            correo: carrito.comprador,
            idProducto: carrito.productos,
            cantidad: carrito.cantidades,
        }
        return await axios.post('http://localhost:3001/api/agregarProductoCarrito', values);
    }

    async eliminarProducto(productoEnCarrito){
        let values = {
            correo: productoEnCarrito.comprador,
            idProducto: productoEnCarrito.productos,
        }
        return await axios.post('http://localhost:3001/api/eliminarProductoCarrito',values);
    }
}