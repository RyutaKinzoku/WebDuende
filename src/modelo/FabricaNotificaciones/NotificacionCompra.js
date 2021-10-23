import Notificacion from "./Notificacion";

export default class NotificacionCita extends Notificacion {
    constructor(id) {
        super.id = id;
    }

    get idOrdenCompra(){
        return this.idOrdenCompra;
    }

    set idOrdenCompra(idOrdenCompra){
        this.idOrdenCompra = idOrdenCompra;
    }
}