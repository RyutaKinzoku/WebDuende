import ManejoUsuarios from './ManejoUsuarios';
import ManejoProductos from './ManejoProductos';
import ManejoAgenda from './ManejoAgenda';

export default class Controladora{
    constructor(){
        this.manejoUsuarios = new ManejoUsuarios();
        this.manejoProductos = new ManejoProductos();
        this.manejoAgenda = new ManejoAgenda();
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

    async agregarEntrega(fechaHoraInicio, fechaHoraFin, usuario, lugar, orden){
        return this.manejoAgenda.agregarEntrega(fechaHoraInicio, fechaHoraFin, usuario, lugar, orden);
    }

    async agregarCurso(fechaHoraInicio, fechaHoraFin, titulo, lugar){
        return this.manejoAgenda.agregarCurso(fechaHoraInicio, fechaHoraFin, titulo, lugar);
    }

    async agregarCita(fechaHoraInicio, fechaHoraFin, usuario, lugar, publicacion){
        return this.manejoAgenda.agregarCita(fechaHoraInicio, fechaHoraFin, usuario, lugar, publicacion);
    }
}