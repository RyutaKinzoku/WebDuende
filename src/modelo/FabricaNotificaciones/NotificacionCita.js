import Notificacion from "./Notificacion";

export default class NotificacionCita extends Notificacion {
    constructor(id, idPublicacion, correoUsuario, mensaje, lugar, vista) {
        super(id, vista);
        this.mensaje = mensaje;
        this.idPublicacion = idPublicacion;
        this.correoUsuario = correoUsuario;
        this.lugar = lugar;
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

    get lugar(){
        return this._lugar;
    }

    set lugar(lugar){
        this._lugar = lugar;
    }

    type(){
        return "NotificacionCita";
    }
}