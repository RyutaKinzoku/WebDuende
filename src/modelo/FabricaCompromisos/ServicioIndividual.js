import Compromiso from "./Compromiso";

export default class ServicioIndividual extends Compromiso {
    constructor() {
        if (this.constructor == ServicioIndividual) {
            throw new Error("Clase abstracta servicioindividual no puede ser instanciada");
        }
    }

    get usuario(){
        return this._usuario;
    }

    set usuario(usuario){
        this._usuario = usuario;
    }
}