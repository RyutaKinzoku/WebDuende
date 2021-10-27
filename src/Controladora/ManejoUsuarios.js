import Usuario from "../Modelo/Usuario";
import GestorUsuarios from "../DAO/GestorUsuarios";
import GestorBD from "../DAO/GestorBD";

export default class ManejoUsuarios {
    constructor(){
        this.gestorUsuarios = new GestorUsuarios();
    }
    
    iniciarSesion(correo, contrasena){
        let usuario = this.gestorUsuarios.obtener(correo);
        if(usuario !== null){
            if (usuario.contrasena === contrasena){
                return usuario;
            }
        }else{
            return null;
        }
    }

    registrarse(datosUsuario){
        let usuario = new Usuario(datosUsuario.correo, datosUsuario.nombre, datosUsuario.primerApellido, datosUsuario.segundoApellido, datosUsuario.telefono, datosUsuario.cedula, datosUsuario.contrasena, datosUsuario.rol);
        this.gestorUsuarios.registrarse(usuario);
    }
}