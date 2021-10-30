import Compromiso from "./Compromiso";

export default class ServicioIndividual extends Compromiso {
    constructor(fechaHoraInicio, fechaHoraFin, id, lugar, usuario) {
        super(fechaHoraInicio, fechaHoraFin, id, lugar);
        this.usuario = usuario;
    }

    get usuario(){
        return this._usuario;
    }

    set usuario(usuario){
        this._usuario = usuario;
    }
}