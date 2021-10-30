import axios from "axios";
import GestorDB from "./GestorBD";

export default class GestorCompromisos{
    modificarEntrega(entrega){};
    modificarCurso(curso){};
    modificarCita(cita){};
    eliminar(idCompromiso){};
    obtener(idCompromiso){};
    async agregarEntrega(entrega){
        let values = {
            id: entrega.id,
            fechaHoraInicio: entrega.fechaHoraInicio,
            fechaHoraFin: entrega.fechaHoraFin,
            lugar: entrega.lugar,
            correoUsuario: entrega.usuario,
            idOrdenCompra: entrega.orden
        }
        return axios.post('http://localhost:3001/api/agregarEntrega',values);
    };

    async agregarCurso(curso){
        let values = {
            id: curso.id,
            fechaHoraInicio: curso.fechaHoraInicio,
            fechaHoraFin: curso.fechaHoraFin,
            titulo: curso.titulo,
            lugar: curso.lugar
        }
        return axios.post('http://localhost:3001/api/agregarCurso',values);
    };

    agregarCita(cita){};
    obtenerLista(){};
    async getNext(){
        let valor = await axios.get('http://localhost:3001/api/getNextCompromisos');
        return valor.data[0].ultimo_valor;
    };
}