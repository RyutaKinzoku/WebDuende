import axios from "axios";
import Categoria from "../modelo/Categoria";
import GestorDB from "./GestorBD";

export default class GestorCategorias extends GestorDB{
    async modificar(categoria){
        let values = {
            idCategoria: categoria.id,
            nombre: categoria.nombre,
        }
        return axios.post('https://web-duende-server.herokuapp.com/api/modificarCategoria',values);
    };
    async eliminar(idCategoria){
        let values = {
            idCategoria: idCategoria
        }
        return axios.post('https://web-duende-server.herokuapp.com/api/eliminarCategoria', values);
    }

    async obtener(idCategoria){
        var response = await axios.get('https://web-duende-server.herokuapp.com/api/obtenerCategoria',{params: {idCategoria: idCategoria} });
        if(response.data.length>0){
            let categoria = response.data[0];
            let c = new Categoria(categoria.id,categoria.nombre,null);
            return c;
        }
        return null;
    }
    async agregar(categoria){
        let values = {
            idCategoria: categoria.id,
            nombre: categoria.nombre,
        }
        return axios.post('https://web-duende-server.herokuapp.com/api/agregarCategoria',values);
    }

    async obtenerLista(){
        let lista = await axios.get('https://web-duende-server.herokuapp.com/api/getCategorias');
        let categorias = []
        lista.data.forEach(element => {
            let categoria = new Categoria(element.ID, element.nombre);
            categorias.push(categoria);
        });
        return categorias;
    }

    async getNext(){
        let valor = await axios.get('https://web-duende-server.herokuapp.com/api/getNextCategorias');
        return valor.data[0].ultimo_valor;
    }
}