import GestorDB from "./GestorBD";
import Producto from "../modelo/Producto";
import axios from "axios";

export default class GestorProductos{
    modificar(producto){}
    eliminar(idProducto){}
    obtener(idProducto){}
    agregar(producto){}
    async obtenerLista(){
        var response = await axios.get('http://localhost:3001/api/listaProductos');
        var productos = [];
        response.data.forEach(p => {
            productos.push(new Producto(p.id, p.nombre, p.descripcion, p.precio, p.imagen, p.cantidad));
        });
        return productos;
    }
    getNext(){}
}