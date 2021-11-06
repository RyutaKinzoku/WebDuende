import Notificacion from "./Notificacion";

export default class NotificacionCita extends Notificacion {
    constructor(id, idPublicacion, mensaje, correoUsuario) {
        super(id);
        this.mensaje = mensaje;
        this.idPublicacion = idPublicacion;
        this.correoUsuario = correoUsuario;
    }

    get mensaje(){
        return this._mensaje;
    }

    set mensaje(mensaje){
        this._mensaje = mensaje;
    }

    get idPublicacion(){
        return this._idPublicacion;
    }

    set idPublicacion(idPublicacion){
        this._idPublicacion = idPublicacion;
    }

    get correoUsuario(){
        return this._correoUsuario;
    }

    set correoUsuario(correoUsuario){
        this._correoUsuario = correoUsuario;
    }

    type(){
        return "NotificacionCita";
    }
}