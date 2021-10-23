import FabricaCompromisos from "../Modelo/FabricaCompromisos/FabricaCompromisos";
import Compromisos from "../Modelo/FabricaCompromisos/Compromisos";
import GestorCompromisos from "../"

export default class ManejoAgenda{
    constructor(){
        this.gestorCompromisos = new GestorCompromisos();
    }

    obtenerCompromisos(){}

    eliminarCompromiso(idCompromiso){}

    agregarCurso(fechaHoraInicio, fechaHoraFin, titulo, lugar){}

    modificarCurso(fechaHoraInicio, fechaHoraFin, titulo, idCompromiso, lugar){}
    
    agregarCita(fechaHoraInicio, fechaHoraFin, usuario, lugar, publicacion){}

    modificarCita(fechaHoraInicio, fechaHoraFin, idCompromiso, usuario, lugar, publicacion){}

    agregarEntrega(fechaHoraInicio, fechaHoraFin, usuario, lugar, orden){}

    
}