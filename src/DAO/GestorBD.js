export default class GestorBD{
    constructor() {
        if (this.constructor == GestorBD) {
            throw new Error("Clase abstracta GestorBD no puede ser instanciada");
        }
    }

    modificar(objeto){
        throw new Error("Método 'modificar(objeto)' debe ser implementado");
    }

    eliminar(objeto){
        throw new Error("Método 'eliminar(objeto)' debe ser implementado");
    }

    obtener(objeto){
        throw new Error("Método 'obtener(objeto)' debe ser implementado");
    }

    agregar(objeto){
        throw new Error("Método 'agregar(objeto)' debe ser implementado");
    }

    obtenerLista(){
        throw new Error("Método 'obtenerLista()' debe ser implementado");
    }
}