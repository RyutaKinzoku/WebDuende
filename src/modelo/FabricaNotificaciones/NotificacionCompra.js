import Notificacion from "./Notificacion";

export default class NotificacionCita extends Notificacion {
    constructor(id, idOrdenCompra) {
        super.id = id;
        this.idOrdenCompra = idOrdenCompra;
    }

    get idOrdenCompra(){
        return this._idOrdenCompra;
    }

    set idOrdenCompra(idOrdenCompra){
        this._idOrdenCompra = idOrdenCompra;
    }
}