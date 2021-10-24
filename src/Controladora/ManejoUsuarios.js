import Usuario from "../modelo/Usuario";
import GestorUsuarios from "../DAO/GestorUsuarios";
import GestorBD from "../DAO/GestorBD";

export default class ManejoUsuarios {
    constructor(){
        this.gestorUsuarios = new GestorUsuarios();
    }
    
    iniciarSesion(correo, contrasena){
        return this.gestorUsuarios.iniciarSesion(correo, contrasena);
    }

    registrarse(datosUsuario){
        let usuario = new Usuario(datosUsuario.correo, datosUsuario.nombre, datosUsuario.primerApellido, datosUsuario.segundoApellido, datosUsuario.telefono, datosUsuario.cedula, datosUsuario.contrasena, datosUsuario.rol);
        this.gestorUsuarios.registrarse(usuario);
    }
}