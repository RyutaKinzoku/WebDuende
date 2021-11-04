import axios from "axios";
import Categoria from "../modelo/Categoria";
import GestorDB from "./GestorBD";

export default class GestorCategorias extends GestorDB{
    modificar(categoria){}
    async eliminar(idCategoria){
        let values = {
            idCategoria: idCategoria
        }
        return axios.post('http://localhost:3001/api/eliminarCategoria', values);
    }
    
    obtener(idCategoria){}
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