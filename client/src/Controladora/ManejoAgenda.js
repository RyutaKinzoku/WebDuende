import FabricaCompromisos from "../modelo/FabricaCompromisos/FabricaCompromisos";
import GestorCompromisos from "../DAO/GestorCompromisos";
import GestorBD from "../DAO/GestorBD";/*
import Cita from "../Modelo/FabricaCompromisos/Cita";
import Curso from "../Modelo/FabricaCompromisos/Curso";
import Entrega from "../Modelo/FabricaCompromisos/Entrega";*/

export default class ManejoAgenda{
    constructor(){
        this.gestorCompromisos = new GestorCompromisos();
    }

    async obtenerCompromisos(){
        return this.gestorCompromisos.obtenerLista();
    }

    async obtenerCompromiso(type, idCompromiso){
        return this.gestorCompromisos.obtener(type, idCompromiso);
    }

    async eliminarCompromiso(type, idCompromiso){
        return this.gestorCompromisos.eliminar(type, idCompromiso);
    }

    async agregarCurso(fechaHoraInicio, fechaHoraFin, titulo, lugar){
        let idCompromiso = await this.gestorCompromisos.getNext();
        let curso = FabricaCompromisos.fabricarCompromiso("Curso;"+fechaHoraInicio+";"+fechaHoraFin+";"+titulo+";"+idCompromiso+";"+lugar);
        return this.gestorCompromisos.agregarCurso(curso);
    }

    async modificarCurso(fechaHoraInicio, fechaHoraFin, titulo, idCompromiso, lugar){
        let curso = FabricaCompromisos.fabricarCompromiso("Curso;"+fechaHoraInicio+";"+fechaHoraFin+";"+titulo+";"+idCompromiso+";"+lugar);
        return this.gestorCompromisos.modificarCurso(curso);
    }
    
    async agregarCita(fechaHoraInicio, fechaHoraFin, usuario, lugar, publicacion){
        let idCompromiso = await this.gestorCompromisos.getNext();
        let cita = FabricaCompromisos.fabricarCompromiso("Cita;"+fechaHoraInicio+";"+fechaHoraFin+";"+idCompromiso+";"+lugar+";"+usuario+";"+publicacion);
        return this.gestorCompromisos.agregarCita(cita);
    }

    async modificarCita(fechaHoraInicio, fechaHoraFin, idCompromiso, usuario, lugar, publicacion){
        let cita = FabricaCompromisos.fabricarCompromiso("Cita;"+fechaHoraInicio+";"+fechaHoraFin+";"+idCompromiso+";"+lugar+";"+usuario+";"+publicacion);
        return this.gestorCompromisos.modificarCita(cita);
    }

    async agregarEntrega(fechaHoraInicio, fechaHoraFin, usuario, lugar, orden){
        let idCompromiso = await this.gestorCompromisos.getNext();
        let entrega = FabricaCompromisos.fabricarCompromiso("Entrega;"+fechaHoraInicio+";"+fechaHoraFin+";"+idCompromiso+";"+lugar+";"+usuario+";"+orden);
        return this.gestorCompromisos.agregarEntrega(entrega);
    }

    async modificarEntrega(fechaHoraInicio, fechaHoraFin, idCompromiso, usuario, lugar, orden){
        let entrega = FabricaCompromisos.fabricarCompromiso("Entrega;"+fechaHoraInicio+";"+fechaHoraFin+";"+idCompromiso+";"+lugar+";"+usuario+";"+orden);
        return this.gestorCompromisos.modificarEntrega(entrega);
    }
}