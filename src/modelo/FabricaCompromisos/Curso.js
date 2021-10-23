import Compromiso from "./Compromiso";

export default class Curso extends Compromiso {
    constructor(fechaHoraInicio, fechaHoraInicio, titulo, id, lugar) {
        super.fechaHoraInicio = fechaHoraInicio;
        super.fechaHoraFin = fechaHoraFin;
        this.titulo = titulo;
        super.id = id;
        super.lugar = lugar;
    }

    get titulo(){
        return this.titulo;
    }

    set titulo(titulo){
        this.titulo = titulo;
    }
}