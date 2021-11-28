export default class Contexto{
    constructor(){
        this.notificacionStrategy = null;
    }

    get notificacionStrategy(){
        return this._notificacionStrategy;
    }

    set notificacionStrategy(notificacionStrategy){
        this._notificacionStrategy = notificacionStrategy;
    }

    cambiarSrategy(notificacionStrategy){
        this.notificacionStrategy = notificacionStrategy;
    }

    getNotificaciones(){
        return this.notificacionStrategy.getNotificaciones();
    }
}