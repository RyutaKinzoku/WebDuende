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

    async agregarNotificacionCita(idPublicacion, correo, mensaje){
        let idNotificacion = await this.gestorNotificaciones.getNext();
        let notificacionCita = FabricaNotificaciones.fabricarNotificacion("NotificacionCita;"+idNotificacion+";"+idPublicacion+";"+correo+";"+mensaje);
        return this.gestorNotificaciones.agregarNotificacionCita(notificacionCita);
    }

    async agregarNotificacionCompra(idOrden){
        let idNotificacion = await this.gestorNotificaciones.getNext();
        let notificacionCompra =  FabricaNotificaciones.fabricarNotificacion("NotificacionCompra;"+idNotificacion+";"+idOrden+";");
        return this.gestorNotificaciones.agregarNotificacionCompra(notificacionCompra);
    }
    
    async eliminarNotificacion(type, idNotificacion){
        return this.gestorNotificaciones.eliminar(type, idNotificacion);
    }

    async eliminarNotificacionDesdeOrden(type, idOrden){
        return this.gestorNotificaciones.eliminarNotificacionDesdeOrden(type, idOrden);
    }
}