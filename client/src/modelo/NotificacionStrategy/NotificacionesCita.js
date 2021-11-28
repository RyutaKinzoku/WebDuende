import GestorNotificaciones from "../../DAO/GestorNotificaciones";
import NotificacionStrategy from "./NotificacionStrategy";

export default class NotificacionesCita extends NotificacionStrategy{
    constructor(){
        super();
        this.gestorNotificaciones = new GestorNotificaciones();
    }
    
    getNotificaciones(){
        return this.gestorNotificaciones.obtenerNotificacionesCita();
    }
}