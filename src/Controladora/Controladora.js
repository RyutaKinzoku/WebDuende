import ManejoUsuarios from './ManejoUsuarios';
import ManejoProductos from './ManejoProductos'

export default class Controladora{
    constructor(){
        this.manejoUsuarios = new ManejoUsuarios();
        this.manejoProductos = new ManejoProductos();
    }

    async iniciarSesion(correo, contrasena){
        return this.manejoUsuarios.iniciarSesion(correo, contrasena);
    }
        
    async registrarse(datosUsuario){
        return this.manejoUsuarios.registrarse(datosUsuario);
    }

    async obtenerProductos(){
        return this.manejoProductos.obtenerProductos();
    }

    async crearProducto(nombre, descripcion, precio, cantidad, imagen){
        return this.manejoProductos.crearProducto(nombre, descripcion, precio, cantidad, imagen);
    }
}