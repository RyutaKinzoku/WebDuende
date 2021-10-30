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
        var response = await axios.get('http://localhost:3001/ap1/obtenerProductosCarrito');
        var productos = [];
        
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