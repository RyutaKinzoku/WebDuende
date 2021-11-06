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
        return axios.post('http://localhost:3001/api/eliminarOrden', values);
    }

    obtener(idOrden){}

    async agregarOrden(orden){
        const form = new FormData();
        var trueProductos = "";
        for (var producto of orden.productos){
            trueProductos+=producto.id+"|"+producto.nombre+"|"+producto.descripcion+"|"+producto.precio+"|"+producto.cantidad+"|"+producto.imagen+"¨"
        }
        console.log(orden.comprador)
        form.append('idOrden', orden.id);
        form.append('direccion', orden.direccion);
        form.append('comprador', orden.comprador);
        form.append('productos', trueProductos);
        form.append('comprobante', orden.comprobante);
        var err = await axios.post('http://localhost:3001/api/agregarOrden', form, {
            headers: config.headers,
        })
        if(err.data){
            return orden.id;
        }else{
            return -1;
        }
    }

    async obtenerLista(){
        var idsOrden = await axios.get('http://localhost:3001/api/listaCompras');
        var ordenes = [];
        idsOrden.data.forEach(o => {
            ordenes.push(new OrdenCompra(o.id, o.comprobante, o.direccion, o.comprador, o.productos))
        });
        return ordenes;
    }

    async getNext(){
        var response = await axios.get('http://localhost:3001/api/getIdOrden');
        return response.data[0].ultimo_valor;
    }

    async setNext(){
        return axios.post('http://localhost:3001/api/setIdORden');
    }
}