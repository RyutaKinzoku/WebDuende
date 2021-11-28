export default class Compromiso {
    constructor(fechaHoraInicio, fechaHoraFin, id, lugar) {
        this.fechaHoraInicio = fechaHoraInicio;
        this.fechaHoraFin = fechaHoraFin;
        this.id = id;
        this.lugar = lugar;
    }

    get fechaHoraInicio(){
        return this._fechaHoraInicio;
    }

    set fechaHoraInicio(fechaHoraInicio){
        this._fechaHoraInicio = fechaHoraInicio;
    }

    get fechaHoraFin(){
        return this._fechaHoraFin;
    }

    set fechaHoraFin(fechaHoraFin){
        this._fechaHoraFin = fechaHoraFin;
    }

    get id(){
        return this._id;
    }

    set id(id){
        this._id = id;
    }

    get lugar(){
        return this._lugar;
    }

    set lugar(lugar){
        this._lugar = lugar;
    }
}