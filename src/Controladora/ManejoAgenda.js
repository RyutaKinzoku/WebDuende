import FabricaCompromisos from "../Modelo/FabricaCompromisos/FabricaCompromisos";
import Compromisos from "../Modelo/FabricaCompromisos/Compromisos";
import GestorCompromisos from "../DAO/GestorCompromisos";
import GestorBD from "../DAO/GestorBD";

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
        let id = this.gestorCompromisos.getNext();
        let curso = new Curso(fechaHoraInicio, fechaHoraFin, titulo, id, lugar);
        this.gestorCompromisos.agregarCurso(curso);
    }

    modificarCurso(fechaHoraInicio, fechaHoraFin, titulo, idCompromiso, lugar){
        let curso = new Curso(fechaHoraInicio, fechaHoraFin, titulo, idCompromiso, lugar);
        this.gestorCompromisos.modificarCurso(curso);
    }
    
    agregarCita(fechaHoraInicio, fechaHoraFin, usuario, lugar, publicacion){}

    modificarCita(fechaHoraInicio, fechaHoraFin, idCompromiso, usuario, lugar, publicacion){}

    agregarEntrega(fechaHoraInicio, fechaHoraFin, usuario, lugar, orden){}

    modificarEntrega(fechaHoraInicio, fechaHoraFin, idCompromiso, usuario, lugar, orden){}
}