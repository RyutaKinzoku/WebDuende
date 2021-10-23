export default class OrdenCompra {
    constructor(id, comprobante, direccion, comprador, productos){
        this.id = id;
        this.comprobante = comprobante;
        this.direccion = direccion;
        this.comprador = comprador;
        this.productos = productos;
    }

    get id(){
        return this.id;
    }

    get comprobante(){
        return this.comprobante;
    }

    set comprobante(comprobante){
        this.comprobante = comprobante;
    }

    get direccion(){
        return this.direccion;
    }

    set direccion(direccion){
        this.direccion = direccion;
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