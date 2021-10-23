export default class Compromiso {
    constructor() {
        if (this.constructor == Compromiso) {
            throw new Error("Clase abstracta Compromiso no puede ser instanciada");
        }
    }

    get fechaHoraInicio(){
        return this.fechaHoraInicio;
    }

    set fechaHoraInicio(fechaHoraInicio){
        this.fechaHoraInicio = fechaHoraInicio;
    }

    get fechaHoraFin(){
        return this.fechaHoraFin;
    }

    set fechaHoraFin(fechaHoraFin){
        this.fechaHoraFin = fechaHoraFin;
    }

    get id(){
        return this.id;
    }

    set id(id){
        this.id = id;
    }

    get lugar(){
        return this.lugar;
    }

    set lugar(lugar){
        this.lugar = lugar;
    }
}