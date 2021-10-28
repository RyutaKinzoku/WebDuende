import Usuario from "../modelo/Usuario";
import GestorUsuarios from "../DAO/GestorUsuarios";
import GestorBD from "../DAO/GestorBD";

export default class ManejoUsuarios {
    constructor(){
        this.gestorUsuarios = new GestorUsuarios();
    }
    
    async iniciarSesion(correo, contrasena){
        let usuario = await this.gestorUsuarios.obtener(correo);
        if(usuario !== null){
            if (usuario.contrasena === contrasena){
                return usuario;
            }
            return null;
        }
        return usuario;
    }

    async registrarse(datosUsuario){
        let usuario = new Usuario(datosUsuario.correo, datosUsuario.nombre, datosUsuario.primerApellido, datosUsuario.segundoApellido, datosUsuario.telefono, datosUsuario.cedula, datosUsuario.contrasena, datosUsuario.rol);
        return this.gestorUsuarios.agregar(usuario);
    }
}