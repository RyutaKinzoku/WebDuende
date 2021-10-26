import GestorDB from "./GestorBD";
import Usuario from "../modelo/Usuario";

export default class GestorUsuarios{
    modificar(usuario){}
    eliminar(correo){}
    obtener(correo){
        return new Usuario("rey86@gmail.com", "Reyner", "Arias", "Muñoz", "32545352", "3523525325", "1234", "COMUN");
    }
    agregar(usuario){}
    obtenerLista(){}
}