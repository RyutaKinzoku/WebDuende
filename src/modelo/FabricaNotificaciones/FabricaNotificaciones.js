/*import Notificacion from "./Notificacion";
import NotificacionCita from "./NotificacionCita";
import NotificacionCompra from "./NotificacionCompra";*/

export default class FabricaNotificaciones {
    FabricaNotificacion(estructura){
        if(estructura === "NotificacionCita"){
            return "Notificacion Cita";
        }else if(estructura === "NotificacionCompra"){
            return "Notificacion Compra";
        }else{
            return "Notificacion no existente";
        }
    }
}