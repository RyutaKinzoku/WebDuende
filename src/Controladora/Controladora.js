import ManejoUsuarios from './ManejoUsuarios';
import ManejoProductos from './ManejoProductos';
import ManejoAgenda from './ManejoAgenda';
import ManejoCompras from './ManejoCompras';
import { ThemeProvider } from 'react-bootstrap';

export default class Controladora{
    constructor(){
        this.manejoUsuarios = new ManejoUsuarios();
        this.manejoProductos = new ManejoProductos();
        this.manejoAgenda = new ManejoAgenda();
        this.ManejoCompras = new ManejoCompras();
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

    async agregarProducto(nombre, descripcion, precio, cantidad, imagen){
        return this.manejoProductos.agregarProducto(nombre, descripcion, precio, cantidad, imagen);
    }

    async eliminarProducto(id){
        return this.manejoProductos.eliminarProducto(id);
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

    async agregarProductoCarrito(correo, idProducto, cantidad){
        return this.ManejoCompras.agregarProductoCarrito(correo, idProducto, cantidad);
    }

    async obtenerProductosCarrito(correo){
        return this.ManejoCompras.obtenerProductosCarrito(correo);
    }

    async eliminarProductoCarrito(correo, idProducto){
        return this.ManejoCompras.eliminarProductoCarrito(correo, idProducto);
    }

    async comprar(correo, comprobante, direccion){
        return this.ManejoCompras.comprar(correo, comprobante, direccion);
    }

    async obtenerCantidadProductoCarrito(correo, idProducto){
        return this.ManejoCompras.obtenerCantidadProductoCarrito(correo, idProducto);
    }
}