class OrdenCompra {
    constructor(comprobante, direccion, comprador){
        // this.id = revisar en BD
        this.comprobante = comprobante;
        this.direccion = direccion;
        this.comprador = comprador;
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
}