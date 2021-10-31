import GestorDB from "./GestorBD";
import Producto from "../modelo/Producto";
import axios from "axios";

const FormData = require('form-data');
const config = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
};
var fs = require('fs');

export default class GestorProductos{
    async modificar(producto){}

    async eliminar(idProducto){
        let values = {
            idProducto: idProducto
        }
        let producto = await (await this.obtener(idProducto)).data[0];
        let imagen = producto.imagen;
        console.log(producto);
        console.log("../../public/assets/images" + imagen);
        fs.unlink("../../public/assets/images" + imagen, function(err){
            if (err) return err;
        });
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