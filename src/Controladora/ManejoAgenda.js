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

    eliminarCompromiso(idCompromiso){
        this.gestorCompromisos.eliminar(idCompromiso);
    }

    async agregarCurso(fechaHoraInicio, fechaHoraFin, titulo, lugar){
        let idCompromiso = await this.gestorCompromisos.getNext();
        let curso = FabricaCompromisos.fabricarCompromiso("Curso;"+fechaHoraInicio+";"+fechaHoraFin+";"+titulo+";"+idCompromiso+";"+lugar);
        return this.gestorCompromisos.agregarCurso(curso);
    }

    modificarCurso(fechaHoraInicio, fechaHoraFin, titulo, idCompromiso, lugar){
        let curso = FabricaCompromisos.fabricarCompromiso("Curso;"+fechaHoraInicio+";"+fechaHoraFin+";"+titulo+";"+idCompromiso+";"+lugar);
        this.gestorCompromisos.modificarCurso(curso);
    }
    
    async agregarCita(fechaHoraInicio, fechaHoraFin, usuario, lugar, publicacion){
        let idCompromiso = await this.gestorCompromisos.getNext();
        let cita = FabricaCompromisos.fabricarCompromiso("Cita;"+fechaHoraInicio+";"+fechaHoraFin+";"+idCompromiso+";"+lugar+";"+usuario+";"+publicacion);
        return this.gestorCompromisos.agregarCita(cita);
    }

    modificarCita(fechaHoraInicio, fechaHoraFin, idCompromiso, correoUsuario, lugar, idPublicacion){
        let usuario = this.gestorUsuarios.obtener(correoUsuario);
        let publicacion = this.gestorPublicaciones.obtener(idPublicacion);
        let cita = FabricaCompromisos.fabricarCompromiso("Cita;"+fechaHoraInicio+";"+fechaHoraFin+";"+idCompromiso+";"+lugar+";"+usuario+";"+publicacion);
        this.gestorCompromisos.modificarCita(cita);
    }

    async agregarEntrega(fechaHoraInicio, fechaHoraFin, usuario, lugar, orden){
        let idCompromiso = await this.gestorCompromisos.getNext();
        let entrega = FabricaCompromisos.fabricarCompromiso("Entrega;"+fechaHoraInicio+";"+fechaHoraFin+";"+idCompromiso+";"+lugar+";"+usuario+";"+orden);
        return this.gestorCompromisos.agregarEntrega(entrega);
    }

    modificarEntrega(fechaHoraInicio, fechaHoraFin, idCompromiso, correoUsuario, lugar, idOrdenCompra){
        let usuario = this.gestorUsuarios.obtener(correoUsuario);
        let orden = this.gestorOrdenes.obtener(idOrdenCompra);
        let entrega = FabricaCompromisos.fabricarCompromiso("Entrega;"+fechaHoraInicio+";"+fechaHoraFin+";"+idCompromiso+";"+lugar+";"+usuario+";"+orden);
        this.gestorCompromisos.modificarEntrega(entrega);
    }
}