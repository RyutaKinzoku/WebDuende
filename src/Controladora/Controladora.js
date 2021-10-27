import ManejoUsuarios from './ManejoUsuarios';
export default class ManejoAgenda{
    constructor(){
        this.manejoUsuarios = new ManejoUsuarios();
    }

    async iniciarSesion(correo, contrasena){
        return this.manejoUsuarios.iniciarSesion(correo, contrasena);
    }
}