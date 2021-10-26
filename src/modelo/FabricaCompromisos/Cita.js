import ServicioIndividual from "./ServicioIndividual";

export default class Cita extends ServicioIndividual {
    constructor(fechaHoraInicio, fechaHoraFin, id, lugar, usuario, publicacion) {
        super.fechaHoraInicio = fechaHoraInicio;
        super.fechaHoraFin = fechaHoraFin;
        super.id = id;
        super.lugar = lugar;
        super.usuario = usuario;
        this.publicacion = publicacion;
    }

    get publicacion(){
        return this._publicacion;
    }

    set publicacion(publicacion){
        this._publicacion = publicacion;
    }
}