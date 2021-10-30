export default class Carrito{
    constructor(comprador, productos, cantidades){
        this.comprador = comprador;
        this.productos = productos;
        this.cantidades = cantidades;
    }

    set comprador(comprador){
        this._comprador = comprador;
    }

    get comprador(){
        return this._comprador;
    }

    get productos(){
        return this._productos;
    }

    set productos(productos){
        this._productos = productos;
    }

    get cantidades(){
        return this._cantidades;
    }

    set cantidades(cantidades){
        this._cantidades = cantidades;
    }
}