export default class Compromiso {
    constructor() {
        if (this.constructor == Compromiso) {
            throw new Error("Clase abstracta compromiso no puede ser instanciada");
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

    get idCompromiso(){
        return this.idCompromiso;
    }

    set idCompromiso(idCompromiso){
        this.idCompromiso = idCompromiso;
    }

    get lugar(){
        return this.lugar;
    }

    set lugar(lugar){
        this.lugar = lugar;
    }
}