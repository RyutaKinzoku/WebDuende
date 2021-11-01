export default class OrdenCompra {
    constructor(id, comprobante, direccion, comprador, productos){
        this.id = id;
        this.comprobante = comprobante;
        this.direccion = direccion;
        this.comprador = null;
        this.productos = productos;
    }

    set id(idOrden){
        this._id = idOrden;
    }

    get id(){
        return this._id;
    }

    get comprobante(){
        return this._comprobante;
    }

    set comprobante(comprobante){
        this._comprobante = comprobante;
    }

    get direccion(){
        return this._direccion;
    }

    set direccion(direccion){
        this._direccion = direccion;
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