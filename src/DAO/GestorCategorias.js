import axios from "axios";
import Categoria from "../modelo/Categoria";
import GestorDB from "./GestorBD";

export default class GestorCategorias extends GestorDB{
    async modificar(categoria){
        let values = {
            idCategoria: categoria.id,
            nombre: categoria.nombre,
        }
        return axios.post('http://localhost:3001/api/modificarCategoria',values);
    };
    async eliminar(idCategoria){
        let values = {
            idCategoria: idCategoria
        }
        return axios.post('http://localhost:3001/api/eliminarCategoria', values);
    }

    async obtener(idCategoria){
        var response = await axios.get('http://localhost:3001/api/obtenerCategoria',{params: {idCategoria: idCategoria} });
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
        return await axios.post('http://localhost:3001/api/agregarCategoria',values);
    }

    async obtenerLista(){
        let lista = await axios.get('http://localhost:3001/api/getCategorias');
        let categorias = []
        lista.data.forEach(element => {
            let categoria = new Categoria(element.ID, element.nombre);
            categorias.push(categoria);
        });
        return categorias;
    }

    async getNext(){
        let valor = await axios.get('http://localhost:3001/api/getNextCategorias');
        return valor.data[0].ultimo_valor;
    }
}