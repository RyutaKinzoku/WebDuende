export default class Notificacion {
    constructor(id, vista) {
        this.id = id;
        this.vista = vista;
    }

    get id(){
        return this._id;
    }

    set id(id){
        this._id = id;
    }

    get vista(){
        return this._vista;
    }

    set vista(vista){
        this._vista = vista;
    }
}