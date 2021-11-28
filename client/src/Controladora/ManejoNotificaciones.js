import FabricaNotificaciones from "../modelo/FabricaNotificaciones/FabricaNotificaciones";
import Notificaciones from "../modelo/FabricaNotificaciones/Notificacion";
import GestorNotificaciones from "../DAO/GestorNotificaciones";
import GestorDB from "../DAO/GestorBD";
import NotificacionCita from "../modelo/FabricaNotificaciones/NotificacionCita";
import NotificacionCompra from "../modelo/FabricaNotificaciones/NotificacionCompra";
import Contexto from "../modelo/NotificacionStrategy/Contexto";
import NotificacionesCita from "../modelo/NotificacionStrategy/NotificacionesCita";
import NotificacionesCompra from "../modelo/NotificacionStrategy/NotificacionesCompra";

export default class ManejoNotificaciones{
    constructor(){
        this.gestorNotificaciones = new GestorNotificaciones();
        this.contexto = new Contexto();
    }

    obtenerNotificacionesCita(){
        let estrategia = new NotificacionesCita();
        this.contexto.cambiarSrategy(estrategia);
        return this.contexto.getNotificaciones();
    }

    obtenerNotificacionesCompra(){
        let estrategia = new NotificacionesCompra();
        this.contexto.cambiarSrategy(estrategia);
        return this.contexto.getNotificaciones();
    }

    async obtenerNotificaciones(){
        return this.gestorNotificaciones.obtenerLista();
    }

    async agregarNotificacionCita(idPublicacion, correo, mensaje, lugar){
        let idNotificacion = await this.gestorNotificaciones.getNext();
        let notificacionCita = FabricaNotificaciones.fabricarNotificacion("NotificacionCita;"+idNotificacion+";"+idPublicacion+";"+correo+";"+mensaje+";"+lugar);
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