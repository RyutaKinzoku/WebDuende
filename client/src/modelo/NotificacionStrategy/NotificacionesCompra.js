import GestorNotificaciones from "../../DAO/GestorNotificaciones";
import NotificacionStrategy from "./NotificacionStrategy";

export default class NotificacionesCompra extends NotificacionStrategy{
    constructor(){
        super();
        this.gestorNotificaciones = new GestorNotificaciones();
    }
    
    getNotificaciones(){
        return this.gestorNotificaciones.obtenerNotificacionesCompra();
    }
}