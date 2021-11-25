import axios from "axios";
import GestorDB from "./GestorBD";
import FabricaCompromisos from "../modelo/FabricaCompromisos/FabricaCompromisos";

export default class GestorCompromisos extends GestorDB{
    async modificarEntrega(entrega){
        let values = {
            id: entrega.id,
            fechaHoraInicio: entrega.fechaHoraInicio,
            fechaHoraFin: entrega.fechaHoraFin,
            correoUsuario: entrega.usuario,
            lugar: entrega.lugar,
            idOrdenCompra: entrega.orden
        }
        return axios.post('https://web-duende-server.herokuapp.com/api/modificarEntrega',values);
    };

    async modificarCurso(curso){
        let values = {
            id: curso.id,
            fechaHoraInicio: curso.fechaHoraInicio,
            fechaHoraFin: curso.fechaHoraFin,
            titulo: curso.titulo,
            lugar: curso.lugar
        }
        return axios.post('https://web-duende-server.herokuapp.com/api/modificarCurso',values);
    };

    async modificarCita(cita){
        let values = {
            id: cita.id,
            fechaHoraInicio: cita.fechaHoraInicio,
            fechaHoraFin: cita.fechaHoraFin,
            correoUsuario: cita.usuario,
            lugar: cita.lugar,
            idPublicacion: cita.publicacion
        }
        return axios.post('https://web-duende-server.herokuapp.com/api/modificarCita',values);
    };

    async eliminar(type, idCompromiso){
        let values = {
            idCompromiso: idCompromiso
        }
        if(type === "Curso"){
            return axios.post('https://web-duende-server.herokuapp.com/api/eliminarCurso',values);
        } else if(type === "Cita") {
            return axios.post('https://web-duende-server.herokuapp.com/api/eliminarCita',values);
        } else if(type === "Entrega") {
            return axios.post('https://web-duende-server.herokuapp.com/api/eliminarEntrega',values);
        }
    };

    async obtener(type, idCompromiso){
        if(type === "Curso"){
            var response = await axios.get('https://web-duende-server.herokuapp.com/api/obtenerCurso',{params: {idCompromiso: idCompromiso} });
            if(response.data.length>0){
                let curso = response.data[0];
                let c = FabricaCompromisos.fabricarCompromiso("Curso;"+curso.fechaHoraInicio+";"+curso.fechaHoraFin+";"+curso.titulo+";"+curso.idCompromiso+";"+curso.lugar);
                return c;
            }
        }else if(type === "Cita"){
            var response = await axios.get('https://web-duende-server.herokuapp.com/api/obtenerCita',{params: {idCompromiso: idCompromiso} });
            if(response.data.length>0){
                let cita = response.data[0];
                let c = FabricaCompromisos.fabricarCompromiso("Cita;"+cita.fechaHoraInicio+";"+cita.fechaHoraFin+";"+cita.ID+";"+cita.lugar+";"+cita.correoUsuario+";"+cita.idPublicacion);
                return c;
            }
        }else if(type === "Entrega"){
            var response = await axios.get('https://web-duende-server.herokuapp.com/api/obtenerEntrega',{params: {idCompromiso: idCompromiso} });
            if(response.data.length>0){
                let entrega = response.data[0];
                let e = FabricaCompromisos.fabricarCompromiso("Entrega;"+entrega.fechaHoraInicio+";"+entrega.fechaHoraFin+";"+entrega.ID+";"+entrega.lugar+";"+entrega.correoUsuario+";"+entrega.idOrdenCompra);
                return e;
            }
        }
    };

    async agregarEntrega(entrega){
        let values = {
            id: entrega.id,
            fechaHoraInicio: entrega.fechaHoraInicio,
            fechaHoraFin: entrega.fechaHoraFin,
            lugar: entrega.lugar,
            correoUsuario: entrega.usuario,
            idOrdenCompra: entrega.orden
        }
        return axios.post('https://web-duende-server.herokuapp.com/api/agregarEntrega',values);
    };

    async agregarCurso(curso){
        let values = {
            id: curso.id,
            fechaHoraInicio: curso.fechaHoraInicio,
            fechaHoraFin: curso.fechaHoraFin,
            titulo: curso.titulo,
            lugar: curso.lugar
        }
        return axios.post('https://web-duende-server.herokuapp.com/api/agregarCurso',values);
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
        return axios.post('https://web-duende-server.herokuapp.com/api/agregarCita',values);
    };

    async obtenerLista(){
        let cursos = await axios.get('https://web-duende-server.herokuapp.com/api/getCursos');
        let citas = await axios.get('https://web-duende-server.herokuapp.com/api/getCitas');
        let entregas = await axios.get('https://web-duende-server.herokuapp.com/api/getEntregas');
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
        let valor = await axios.get('https://web-duende-server.herokuapp.com/api/getNextCompromisos');
        return valor.data[0].ultimo_valor;
    };
}