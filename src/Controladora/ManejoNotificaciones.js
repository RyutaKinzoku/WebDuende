import FabricaNotificaciones from "../modelo/FabricaNotificaciones/FabricaNotificaciones";
import Notificaciones from "../modelo/FabricaNotificaciones/Notificacion";
import GestorNotificaciones from "../DAO/GestorNotificaciones";
import GestorDB from "../DAO/GestorBD";
import NotificacionCita from "../modelo/FabricaNotificaciones/NotificacionCita";
import NotificacionCompra from "../modelo/FabricaNotificaciones/NotificacionCompra";

export default class ManejoNotificaciones{
    constructor(){
        this.gestorNotificaciones = new GestorNotificaciones();
    }

    async obtenerNotificaciones(){
        return this.gestorNotificaciones.obtenerLista();
    }

    agregarNotificacionCita(idPublicacion, correo, mensaje){
        let idNotificacion = this.gestorNotificaciones.getNext();
        let notificacionCita = FabricaNotificaciones.fabricarNotificacion("NotificacionCita;"+idNotificacion+";"+idPublicacion+";"+correo+";"+mensaje);
        this.gestorNotificaciones.agregarNotificacionCita(notificacionCita);
    }

    agregarNotificacionCompra(idOrden){
        let idNotificacion = this.gestorNotificaciones.getNext();
        let notificacionCompra =  FabricaNotificaciones.fabricarNotificacion("NotificacionCompra;"+idNotificacion+";"+idOrden);
        this.gestorNotificaciones.agregarNotificacionCompra(notificacionCompra);
    }
    
    eliminarNotificacion(idNotificacion){
        this.gestorNotificaciones.eliminar(idNotificacion);
    }
}