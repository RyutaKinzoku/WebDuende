import Compromiso from "./Compromiso";

export default class Curso extends Compromiso {
    constructor(fechaHoraInicio, fechaHoraFin, titulo, id, lugar) {
        super(fechaHoraInicio, fechaHoraFin, id, lugar);
        this.titulo = titulo;
    }

    get titulo(){
        return this._titulo;
    }

    set titulo(titulo){
        this._titulo = titulo;
    }
}