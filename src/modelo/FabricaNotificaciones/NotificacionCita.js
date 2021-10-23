import Notificacion from "./Notificacion";

export default class NotificacionCita extends Notificacion {
    constructor(id, mensaje, idPublicacion, correoUsuario) {
        super.id = id;
        this.mensaje = mensaje;
        this.idPublicacion = idPublicacion;
        this.correoUsuario = correoUsuario;
    }

    get mensaje(){
        return this.mensaje;
    }

    set mensaje(mensaje){
        this.mensaje = mensaje;
    }

    get idPublicacion(){
        return this.idPublicacion;
    }

    set idPublicacion(idPublicacion){
        this.idPublicacion = idPublicacion;
    }

    get correoUsuario(){
        return this.correoUsuario;
    }

    set correoUsuario(correoUsuario){
        this.correoUsuario = correoUsuario;
    }
}