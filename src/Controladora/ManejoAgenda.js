import FabricaCompromisos from "../Modelo/FabricaCompromisos/FabricaCompromisos";
import Compromisos from "../Modelo/FabricaCompromisos/Compromisos";
import GestorCompromisos from "../DAO/GestorCompromisos";
import GestorBD from "../DAO/GestorBD";/*
import Cita from "../Modelo/FabricaCompromisos/Cita";
import Curso from "../Modelo/FabricaCompromisos/Curso";
import Entrega from "../Modelo/FabricaCompromisos/Entrega";*/

export default class ManejoAgenda{
    constructor(){
        this.gestorCompromisos = new GestorCompromisos();
    }

    obtenerCompromisos(){
        return this.gestorCompromisos.obtenerLista();
    }

    eliminarCompromiso(idCompromiso){
        this.gestorCompromisos.eliminar(idCompromiso);
    }

    agregarCurso(fechaHoraInicio, fechaHoraFin, titulo, lugar){
        let idCompromiso = this.gestorCompromisos.getNext();
        let curso = FabricaCompromisos.fabricarCompromiso("Curso;"+fechaHoraInicio+";"+fechaHoraFin+";"+titulo+";"+idCompromiso+";"+lugar);
        this.gestorCompromisos.agregarCurso(curso);
    }

    modificarCurso(fechaHoraInicio, fechaHoraFin, titulo, idCompromiso, lugar){
        let curso = FabricaCompromisos.fabricarCompromiso("Curso;"+fechaHoraInicio+";"+fechaHoraFin+";"+titulo+";"+idCompromiso+";"+lugar);
        this.gestorCompromisos.modificarCurso(curso);
    }
    
    agregarCita(fechaHoraInicio, fechaHoraFin, correoUsuario, lugar, idPublicacion){
        let idCompromiso = this.gestorCompromisos.getNext();
        let usuario = this.gestorUsuarios.obtener(correoUsuario);
        let publicacion = this.gestorPublicaciones.obtener(idPublicacion);
        let cita = FabricaCompromisos.fabricarCompromiso("Cita;"+fechaHoraInicio+";"+fechaHoraFin+";"+idCompromiso+";"+lugar+";"+usuario+";"+publicacion);
        this.gestorCompromisos.agregarCita(cita);
    }

    modificarCita(fechaHoraInicio, fechaHoraFin, idCompromiso, correoUsuario, lugar, idPublicacion){
        let usuario = this.gestorUsuarios.obtener(correoUsuario);
        let publicacion = this.gestorPublicaciones.obtener(idPublicacion);
        let cita = FabricaCompromisos.fabricarCompromiso("Cita;"+fechaHoraInicio+";"+fechaHoraFin+";"+idCompromiso+";"+lugar+";"+usuario+";"+publicacion);
        this.gestorCompromisos.modificarCita(cita);
    }

    agregarEntrega(fechaHoraInicio, fechaHoraFin, correoUsuario, lugar, idOrdenCompra){
        let idCompromiso = this.gestorCompromisos.getNext();
        let usuario = this.gestorUsuarios.obtener(correoUsuario);
        let orden = this.gestorOrdenes.obtener(idOrdenCompra);
        let entrega = FabricaCompromisos.fabricarCompromiso("Entrega;"+fechaHoraInicio+";"+fechaHoraFin+";"+idCompromiso+";"+lugar+";"+usuario+";"+orden);
        this.gestorCompromisos.agregarEntrega(entrega);
    }

    modificarEntrega(fechaHoraInicio, fechaHoraFin, idCompromiso, correoUsuario, lugar, idOrdenCompra){
        let usuario = this.gestorUsuarios.obtener(correoUsuario);
        let orden = this.gestorOrdenes.obtener(idOrdenCompra);
        let entrega = FabricaCompromisos.fabricarCompromiso("Entrega;"+fechaHoraInicio+";"+fechaHoraFin+";"+idCompromiso+";"+lugar+";"+usuario+";"+orden);
        this.gestorCompromisos.modificarEntrega(entrega);
    }
}