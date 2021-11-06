import Notificacion from "./Notificacion";

export default class NotificacionCompra extends Notificacion {
    constructor(id, idOrdenCompra) {
        super(id);
        this.idOrdenCompra = idOrdenCompra;
    }

    get idOrdenCompra(){
        return this._idOrdenCompra;
    }

    set idOrdenCompra(idOrdenCompra){
        this._idOrdenCompra = idOrdenCompra;
    }

    type(){
        return "NotificacionCompra";
    }
}