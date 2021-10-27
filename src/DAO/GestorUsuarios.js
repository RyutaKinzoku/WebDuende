import GestorDB from "./GestorBD";
import Usuario from "../Modelo/Usuario";
import axios from "axios";

export default class GestorUsuarios{
    modificar(usuario){}
    eliminar(correo){}
    async obtener(correo){
        await axios.get('http://localhost:3001/api/login',{params: {correo: correo} })
        .then(response=>{
            if(response.data.length>0){
                let usuario=response.data[0];
                return new Usuario(usuario.correo, usuario.nombre, usuario.primerApellido, usuario.segundoApellido, usuario.telefono, usuario.cedula, usuario.contrasena, usuario.rol);
            }else{
                return null;
            }
        })
        .catch(error =>{
            console.log(error);
        })
    }
    agregar(usuario){}
    obtenerLista(){}
}