import axios from "axios";
import Categoria from "../modelo/Categoria";
import GestorDB from "./GestorBD";

export default class GestorCategorias extends GestorDB{
    modificar(categoria){}
    eliminar(idCategoria){}
    obtener(idCategoria){}
    agregar(categoria){}

    async obtenerLista(){
        let lista = await axios.get('http://localhost:3001/api/getCategorias');
        let categorias = []
        lista.data.forEach(element => {
            let categoria = new Categoria(element.ID, element.nombre);
            categorias.push(categoria);
        });
        return categorias;
    }

    getNext(){}
}