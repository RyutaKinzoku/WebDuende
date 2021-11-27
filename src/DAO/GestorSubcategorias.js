import axios from "axios";
import Subcategoria from "../modelo/Subcategoria";
import GestorDB from "./GestorBD";

export default class GestorSubcategorias  extends GestorDB{
    modificar(subcategoria){
        let values = {
            idSubcategoria: subcategoria.id,
            nombre: subcategoria.nombre,
        }
        return axios.post('/api/modificarSubcategoria',values);
    }
    eliminar(idSubcategoria){
        let values = {
            idSubcategoria: idSubcategoria
        }
        return axios.post('/api/eliminarSubcategoria', values);
    }
    async obtener(idSubcategoria){
        var response = await axios.get('/api/obtenerSubcategoria',{params: {idSubcategoria: idSubcategoria} });
        if(response.data.length>0){
            let subcategoria = response.data[0];
            let c = new Subcategoria(subcategoria.id,subcategoria.nombre,subcategoria.idCategoria);
            return c;
        }
        return null;
    }
    async agregar(subcategoria){
        let values = {
            idSubcategoria: subcategoria.id,
            idCategoria: subcategoria.idCategoria,
            nombre: subcategoria.nombre,
        }
        return axios.post('/api/agregarSubcategoria',values);
    }
    async obtenerLista(idCategoria){
        let lista = await axios.get('/api/getSubcategorias', {params: {idCategoria: idCategoria}});
        let subcategorias = []
        lista.data.forEach(element => {
            let subcategoria = new Subcategoria(element.ID, element.nombre, element.idCategoria);
            subcategorias.push(subcategoria);
        });
        return subcategorias;
    }
    async getNext(){
        let valor = await axios.get('/api/getNextSubcategorias');
        return valor.data[0].ultimo_valor;
    }
}