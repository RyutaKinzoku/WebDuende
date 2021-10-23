export default class Notificacion {
    constructor() {
        if (this.constructor == Notificacion) {
            throw new Error("Clase abstracta notificacion no puede ser instanciada");
        }
    }

    get id(){
        return this.id;
    }

    set id(id){
        this.id = id;
    }
}