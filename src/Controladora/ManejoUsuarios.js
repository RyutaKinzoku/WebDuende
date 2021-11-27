import Usuario from "../modelo/Usuario";
import GestorUsuarios from "../DAO/GestorUsuarios";
import GestorBD from "../DAO/GestorBD";
import ProxyLogin from "./ProxyLogin/ProxyLogin"

export default class ManejoUsuarios {
    constructor(){
        this.gestorUsuarios = new GestorUsuarios();
        this.proxyLogin = new ProxyLogin();
    }
    
    async iniciarSesion(correo, contrasena){
        let usuario = await this.proxyLogin.obtener(correo);
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

    async obtenerUsuarios(){
        return this.gestorUsuarios.obtenerLista();
    }

    async obtenerUsuariosFrecuencia(){
        return this.gestorUsuarios.obtenerListaFrecuencia();
    }
}