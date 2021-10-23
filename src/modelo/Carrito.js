export default class Carrito{
    constructor(comprador, productos){
        this.comprador = comprador;
        this.productos = productos;
    }

    set comprador(comprador){
        this.comprador = comprador;
    }

    get comprador(){
        return this.comprador;
    }

    set comprador(comprador){
        this.comprador = comprador;
    }

    get productos(){
        return this.productos;
    }

    set productos(productos){
        this.productos = productos;
    }
}