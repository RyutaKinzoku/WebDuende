import FabricaNotificaciones from "../Modelo/FabricaNotificaciones/FabricaNotificaciones";
import Notificaciones from "../Modelo/FabricaNotificaciones/Notificaciones";
import GestorNotificaciones from "../DAO/GestorNotificaciones";
import GestorBD from "../DAO/GestorBD";

export default class ManejoNotificaciones{
    constructor(){
        this.gestorNotificaciones = new GestorNotificaciones();
    }

    obtenerNotificaciones(){
        return this.gestorNotificaciones.obtenerNotificaciones();
    }

    agregarNotificacion(idPublicacion, correo, mensaje){
        let idNotificacion = this.gestorNotificaciones.getNext();
        let notificacionCita = new NotificacionCita(idNotificacion, mensaje, idPublicacion, correo);
        this.gestorNotificaciones.agregarNotificacion(notificacionCita);
    }

    agregarNotificacion(idOrden){
        let idNotificacion = this.gestorNotificaciones.getNext();
        let notificacionCompra = new NotificacionCompra(idNotificacion, idOrden);
        this.gestorNotificaciones.agregarNotificacion(notificacionCompra);
    }
    
    eliminarNotificacion(idNotificacion){
        this.gestorNotificaciones.eliminarNotificacion(idNotificacion);
    }
}