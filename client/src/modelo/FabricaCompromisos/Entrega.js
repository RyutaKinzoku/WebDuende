import ServicioIndividual from "./ServicioIndividual";

export default class Entrega extends ServicioIndividual {
    constructor(fechaHoraInicio, fechaHoraFin, id, lugar, usuario, orden) {
        super(fechaHoraInicio, fechaHoraFin, id, lugar, usuario);
        this.orden = orden;
    }

    get orden(){
        return this._orden;
    }

    set orden(orden){
        this._orden = orden;
    }

    type(){
        return "Entrega";
    }
}