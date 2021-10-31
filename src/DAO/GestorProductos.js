import GestorDB from "./GestorBD";
import Producto from "../modelo/Producto";
import axios from "axios";

const FormData = require('form-data');
const config = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
};

export default class GestorProductos{
    async modificar(producto){
        let values = {
            idProducto: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            cantidad: producto.cantidad,
            imagen: producto.imagen
        }
        return axios.post('http://localhost:3001/api/modificarProducto')
    }

    async eliminar(idProducto){
        let values = {
            idProducto: idProducto
        }
        return axios.post('http://localhost:3001/api/eliminarProducto', values);
    }

    async obtener(idProducto){
        return axios.get('http://localhost:3001/api/obtenerProducto', {params: {idProducto: idProducto} });
    }

    async agregar(producto){
        const form = new FormData();
        form.append('idProducto', producto.id);
        form.append('nombre', producto.nombre);
        form.append('descripcion', producto.descripcion);
        form.append('precio', producto.precio);
        form.append('cantidad', producto.cantidad);
        form.append('imagen', producto.imagen);
        return axios.post('http://localhost:3001/api/agregarProducto', form, {
            headers: config.headers,
        })
    }

    async obtenerLista(){
        var idsProducto = await axios.get('http://localhost:3001/api/listaProductos');
        var productos = [];
        idsProducto.data.forEach(p => {
            productos.push(new Producto(p.id, p.nombre, p.descripcion, p.precio, p.cantidad, p.imagen));
        });
        return productos;
    }

    async getNext(){
        var response = await axios.get('http://localhost:3001/api/getIdProducto');
        return response.data[0].ultimo_valor;
    }

    async setNext(){
        return axios.post('http://localhost:3001/api/setIdProducto');
    }
}