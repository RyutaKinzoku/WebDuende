export default class Carrito{
    constructor(comprador, productos){
        this.comprador = comprador;
        this.productos = productos;
    }

    set comprador(comprador){
        this._comprador = comprador;
    }

    get comprador(){
        return this._comprador;
    }

    set comprador(comprador){
        this._comprador = comprador;
    }

    get productos(){
        return this._productos;
    }

    set productos(productos){
        this._productos = productos;
    }
}