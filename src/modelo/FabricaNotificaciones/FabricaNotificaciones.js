import Notificacion from "./Notificacion";
import NotificacionCita from "./NotificacionCita";
import NotificacionCompra from "./NotificacionCompra";

export default class FabricaNotificaciones {
    static fabricarNotificacion(estructura){
        let datos = estructura.split(';');
        if(datos[0] === "NotificacionCita"){
            return new NotificacionCita(datos[1],datos[2],datos[3],datos[4],datos[5],datos[6]);
        }else if(datos[0] === "NotificacionCompra"){
            return new NotificacionCompra(datos[1],datos[2], datos[3]);
        }else{
            return new Error("Notificacion no existente");
        }
    }
}