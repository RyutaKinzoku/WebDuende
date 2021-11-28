import GestorDB from "./GestorBD";
import OrdenCompra from "../modelo/OrdenCompra";
import axios from "axios";
import Producto from "../modelo/Producto";

const FormData = require('form-data');
const config = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
};
var fs = require('fs');

export default class GestorOrdenes  extends GestorDB{
    modificar(orden){}

    async eliminar(idOrden){
        let values = {
            idOrden: idOrden
        }
        return axios.post('/api/eliminarOrden', values);
    }

    obtener(idOrdenCompra){
        return axios.get('/api/obtenerOrden', {params: {idOrdenCompra: idOrdenCompra}});
    }

    async agregarOrden(orden){
        const form = new FormData();
        var trueProductos = "";
        for (var producto of orden.productos){
            trueProductos+=producto.id+"|"+producto.nombre+"|"+producto.descripcion+"|"+producto.precio+"|"+producto.cantidad+"|"+producto.imagen+"¨"
        }
        form.append('idOrden', orden.id);
        form.append('direccion', orden.direccion);
        form.append('comprador', orden.comprador);
        form.append('productos', trueProductos);
        form.append('comprobante', orden.comprobante);
        var err = await axios.post('/api/agregarOrden', form, {
            headers: config.headers,
        })
        if(err.data){
            return orden.id;
        }else{
            return -1;
        }
    }

    async obtenerLista(){
        var idsOrden = await axios.get('/api/listaCompras');
        var ordenes = [];
        console.log(idsOrden);
        idsOrden.data.forEach(o => {
            ordenes.push(new OrdenCompra(o.id, o.comprobante, o.direccion, o.correoUsuario, o.productos))
        });
        console.log(ordenes);
        return ordenes;
    }

    async getNext(){
        var response = await axios.get('/api/getNextOrden');
        return response.data[0].ultimo_valor;
    }

    async setNext(){
        return axios.post('/api/setIdORden');
    }

    async obtenerProductosOrden(idOrden){
        console.log(idOrden);
        var response = await axios.get('/api/listaProductosOrden',{params:{idOrden: idOrden}});
        console.log(response.data[0].productos);
        return response.data[0].productos;
    }
}