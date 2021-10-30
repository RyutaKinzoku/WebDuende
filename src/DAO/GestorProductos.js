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
    async modificar(producto){}

    async eliminar(idProducto){}

    async obtener(idProducto){}

    async agregar(producto){
        const form = new FormData();
        form.append('idProducto', producto.id);
        form.append('nombre', producto.nombre);
        form.append('descripcion', producto.descripcion);
        form.append('precio', producto.precio);
        form.append('cantidad', producto.cantidad);
        console.log('iushdfoliuasfhdoiusdhfaoiu '+producto.imagen);
        //console.log(String(producto.imagen).split(/(\\|\/)/g).pop())
        form.append('imagen', producto.imagen);
        /*
        let values = {
            idProducto: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: producto.cantidad,
        }
        console.log(values)
        */
        return axios.post('http://localhost:3001/api/agregarProducto', form, {
            headers: config.headers,
        })
        .then((response) => {
            alert(response);
        })
        .catch((error) => {
            return error;
        });
    }

    async obtenerLista(){
        var response = await axios.get('http://localhost:3001/api/listaProductos');
        var productos = [];
        response.data.forEach(p => {
            productos.push(new Producto(p.id, p.nombre, p.descripcion, p.precio, p.imagen, p.cantidad));
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