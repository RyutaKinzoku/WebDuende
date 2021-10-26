export default class Notificacion {
    constructor() {
        if (this.constructor == Notificacion) {
            throw new Error("Clase abstracta notificacion no puede ser instanciada");
        }
    }

    get id(){
        return this._id;
    }

    set id(id){
        this._id = id;
    }
}