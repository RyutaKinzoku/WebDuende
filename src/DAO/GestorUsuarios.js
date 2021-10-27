import GestorDB from "./GestorBD";
import Usuario from "../modelo/Usuario";
import axios from "axios";

export default class GestorUsuarios{
    modificar(usuario){}
    eliminar(correo){}
    async obtener(correo){
        var response = await axios.get('http://localhost:3001/api/login',{params: {correo: correo} });
        if(response.data.length>0){
            let usuario = response.data[0];
            let u = new Usuario(usuario.correo, usuario.nombre, usuario.primerApellido, usuario.segundoApellido, usuario.telefono, usuario.cedula, usuario.contrasena, usuario.rol);
            return u;
        }
        return null;
    }
    agregar(usuario){}
    obtenerLista(){}
}