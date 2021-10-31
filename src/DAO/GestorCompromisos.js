import axios from "axios";
import GestorDB from "./GestorBD";
import FabricaCompromisos from "../modelo/FabricaCompromisos/FabricaCompromisos";

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

    async agregarCita(cita){
        let values = {
            id: cita.id,
            fechaHoraInicio: cita.fechaHoraInicio,
            fechaHoraFin: cita.fechaHoraFin,
            lugar: cita.lugar,
            correoUsuario: cita.usuario,
            idPublicacion: cita.publicacion
        }
        return axios.post('http://localhost:3001/api/agregarCita',values);
    };

    async obtenerLista(){
        let cursos = await axios.get('http://localhost:3001/api/getCursos');
        let citas = await axios.get('http://localhost:3001/api/getCitas');
        let entregas = await axios.get('http://localhost:3001/api/getEntregas');
        let compromisos = [];
        cursos.data.forEach(element => {
            let curso = FabricaCompromisos.fabricarCompromiso("Curso;"+element.fechaHoraInicio+";"+element.fechaHoraFin+";"+element.titulo+";"+element.ID+";"+element.lugar);
            compromisos.push(curso);
        });
        citas.data.forEach(element => {
            let cita = FabricaCompromisos.fabricarCompromiso("Cita;"+element.fechaHoraInicio+";"+element.fechaHoraFin+";"+element.ID+";"+element.lugar+";"+element.correoUsuario+";"+element.idPublicacion);
            compromisos.push(cita);
        });
        entregas.data.forEach(element => {
            let entrega = FabricaCompromisos.fabricarCompromiso("Entrega;"+element.fechaHoraInicio+";"+element.fechaHoraFin+";"+element.ID+";"+element.lugar+";"+element.correoUsuario+";"+element.idOrdenCompra);
            compromisos.push(entrega);
        });
        return compromisos;
    };

    async getNext(){
        let valor = await axios.get('http://localhost:3001/api/getNextCompromisos');
        return valor.data[0].ultimo_valor;
    };
}