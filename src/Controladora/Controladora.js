import ManejoUsuarios from './ManejoUsuarios';
import ManejoProductos from './ManejoProductos';
import ManejoAgenda from './ManejoAgenda';
import ManejoCompras from './ManejoCompras';
import ManejoGaleria from './ManejoGaleria';
import { ThemeProvider } from 'react-bootstrap';

export default class Controladora{
    constructor(){
        this.manejoUsuarios = new ManejoUsuarios();
        this.manejoProductos = new ManejoProductos();
        this.manejoAgenda = new ManejoAgenda();
        this.ManejoCompras = new ManejoCompras();
        this.manejoGaleria = new ManejoGaleria();
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

    async obtenerProducto(idProducto){
        return this.manejoProductos.obtenerProducto(idProducto);
    }

    async agregarProducto(nombre, descripcion, precio, cantidad, imagen){
        console.log(imagen)
        return this.manejoProductos.agregarProducto(nombre, descripcion, precio, cantidad, imagen);
    }

    async eliminarProducto(idProducto){
        return this.manejoProductos.eliminarProducto(idProducto);
    }

    async modificarProducto(idProducto, nombre, descripcion, precio, cantidad, imagen){
        console.log(imagen)
        return this.manejoProductos.modificarProducto(idProducto, nombre, descripcion, precio, cantidad, imagen)
    }

    async agregarEntrega(fechaHoraInicio, fechaHoraFin, usuario, lugar, orden){
        return this.manejoAgenda.agregarEntrega(fechaHoraInicio, fechaHoraFin, usuario, lugar, orden);
    }

    async modificarEntrega(fechaHoraInicio, fechaHoraFin, idCompromiso, usuario, lugar, orden){
        return this.manejoAgenda.modificarEntrega(fechaHoraInicio, fechaHoraFin, idCompromiso, usuario, lugar, orden);
    }

    async agregarCurso(fechaHoraInicio, fechaHoraFin, titulo, lugar){
        return this.manejoAgenda.agregarCurso(fechaHoraInicio, fechaHoraFin, titulo, lugar);
    }

    async modificarCurso(fechaHoraInicio, fechaHoraFin, titulo, idCompromiso, lugar){
        return this.manejoAgenda.modificarCurso(fechaHoraInicio, fechaHoraFin, titulo, idCompromiso, lugar);
    }

    async agregarCita(fechaHoraInicio, fechaHoraFin, usuario, lugar, publicacion){
        return this.manejoAgenda.agregarCita(fechaHoraInicio, fechaHoraFin, usuario, lugar, publicacion);
    }

    async modificarCita(fechaHoraInicio, fechaHoraFin, idCompromiso, usuario, lugar, publicacion){
        return this.manejoAgenda.modificarCita(fechaHoraInicio, fechaHoraFin, idCompromiso, usuario, lugar, publicacion);
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

    async obtenerCompromisos(){
        return this.manejoAgenda.obtenerCompromisos();
    }

    async obtenerCompromiso(type, idCompromiso){
        return this.manejoAgenda.obtenerCompromiso(type, idCompromiso);
    }

    async eliminarCompromiso(type, idCompromiso){
        return this.manejoAgenda.eliminarCompromiso(type, idCompromiso);
    }

    async obtenerCategorias(){
        return this.manejoGaleria.obtenerCategorias();
    }
}