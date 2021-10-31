import GestorDB from "./GestorBD";
import OrdenCompra from "../modelo/OrdenCompra";
import axios from "axios";

const FormData = require('form-data');
const config = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
};
var fs = require('fs');

export default class GestorOrdenes{
    modificar(orden){}
    eliminar(idOrden){}
    obtener(idOrden){}
    agregar(orden){
        const form = new FormData();
        form.append('idProducto', orden.id);
        form.append('nombre', orden.comprobante);
        form.append('descripcion', orden.direccion);
        form.append('precio', orden.correo);
        form.append('cantidad', orden.idsProductos);
        return axios.post('http://localhost:3001/api/agregar', form, {
            headers: config.headers,
        })
    }

    obtenerLista(){}

    getNext(){
        /*var response = await axios.get('http://localhost:3001/api/getIdOrden');
        return response.data[0].ultimo_valor;*/
    }

    async setNext(){
        return axios.post('http://localhost:3001/api/setIdORden');
    }
}