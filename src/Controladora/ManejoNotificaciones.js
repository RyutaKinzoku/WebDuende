import FabricaNotificaciones from "../Modelo/FabricaNotificaciones/FabricaNotificaciones";
import Notificaciones from "../Modelo/FabricaNotificaciones/Notificaciones";
import GestorNotificaciones from "../DAO/GestorNotificaciones";
import GestorBD from "../DAO/GestorBD";
import NotificacionCita from "../Modelo/FabricaCompromisos/NotificacionCita";
import NotificacionCompra from "../Modelo/FabricaCompromisos/NotificacionCompra";

export default class ManejoNotificaciones{
    constructor(){
        this.gestorNotificaciones = new GestorNotificaciones();
    }

    obtenerNotificaciones(){
        return this.gestorNotificaciones.obtenerNotificaciones();
    }

    agregarNotificacion(idPublicacion, correo, mensaje){
        let idNotificacion = this.gestorNotificaciones.getNext();
        let notificacionCita = FabricaNotificaciones.fabricarNotificacion("NotificacionCita;"+idNotificacion+";"+idPublicacion+";"+correo+";"+mensaje);
        this.gestorNotificaciones.agregarNotificacion(notificacionCita);
    }

    agregarNotificacion(idOrden){
        let idNotificacion = this.gestorNotificaciones.getNext();
        let notificacionCompra =  FabricaNotificaciones.fabricarNotificacion("NotificacionCompra;"+idNotificacion+";"+idOrden);
        this.gestorNotificaciones.agregarNotificacion(notificacionCompra);
    }
    
    eliminarNotificacion(idNotificacion){
        this.gestorNotificaciones.eliminarNotificacion(idNotificacion);
    }
}