import ServicioIndividual from "./ServicioIndividual";

export default class Entrega extends ServicioIndividual {
    constructor(fechaHoraInicio, fechaHoraFin, id, lugar, usuario, orden) {
        super.fechaHoraInicio = fechaHoraInicio;
        super.fechaHoraFin = fechaHoraFin;
        super.id = id;
        super.lugar = lugar;
        super.usuario = usuario;
        this.orden = orden;
    }

    get orden(){
        return this._publordenicacion;
    }

    set orden(orden){
        this._orden = orden;
    }
}