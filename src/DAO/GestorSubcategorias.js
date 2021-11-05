import axios from "axios";
import Subcategoria from "../modelo/Subcategoria";
import GestorDB from "./GestorBD";

export default class GestorSubcategorias  extends GestorDB{
    modificar(subcategoria){
        let values = {
            idSubcategoria: subcategoria.id,
            nombre: subcategoria.nombre,
        }
        return axios.post('http://localhost:3001/api/modificarSubcategoria',values);
    }
    eliminar(idSubcategoria){}
    async obtener(idSubcategoria){
        var response = await axios.get('http://localhost:3001/api/obtenerSubcategoria',{params: {idSubcategoria: idSubcategoria} });
        if(response.data.length>0){
            let subcategoria = response.data[0];
            let c = new Subcategoria(subcategoria.id,subcategoria.nombre,null);
            return c;
        }
        return null;
    }
    agregar(subcategoria){}
    async obtenerLista(idCategoria){
        let lista = await axios.get('http://localhost:3001/api/getSubcategorias', {params: {idCategoria: idCategoria}});
        let subcategorias = []
        lista.data.forEach(element => {
            let subcategoria = new Subcategoria(element.ID, element.nombre, element.idCategoria);
            subcategorias.push(subcategoria);
        });
        return subcategorias;
    }
    getNext(){}
}