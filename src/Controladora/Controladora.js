import ManejoUsuarios from './ManejoUsuarios';
import ManejoProductos from './ManejoProductos';
import ManejoAgenda from './ManejoAgenda';
import ManejoCompras from './ManejoCompras';
import ManejoGaleria from './ManejoGaleria';
import ManejoNotificaciones from './ManejoNotificaciones';
import { ThemeProvider } from 'react-bootstrap';

export default class Controladora{
    constructor(){
        this.manejoUsuarios = new ManejoUsuarios();
        this.manejoProductos = new ManejoProductos();
        this.manejoAgenda = new ManejoAgenda();
        this.manejoCompras = new ManejoCompras();
        this.manejoGaleria = new ManejoGaleria();
        this.manejoNotificaciones = new ManejoNotificaciones();
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
        return this.manejoCompras.agregarProductoCarrito(correo, idProducto, cantidad);
    }

    async obtenerProductosCarrito(correo){
        return this.manejoCompras.obtenerProductosCarrito(correo);
    }

    async obtenerProductosOrden(idOrden){
        return this.manejoCompras.obtenerProductosOrden(idOrden);
    }

    async eliminarProductoCarrito(correo, idProducto){
        return this.manejoCompras.eliminarProductoCarrito(correo, idProducto);
    }

    async eliminarCarrito(correo){
        return this.manejoCompras.eliminarCarrito(correo);
    }

    async comprar(correo, comprobante, direccion){
        return this.manejoCompras.comprar(correo, comprobante, direccion);
    }

    async obtenerOrdenes(){
        return this.manejoCompras.obtenerOrdenes();
    }
    
    async agregarOrden(productos, correo, comprobante, direccion){
        return this.manejoCompras.agregarOrden(productos, correo, comprobante, direccion);
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

    async obtenerCategoria(idCategoria){
        return this.manejoGaleria.obtenerCategoria(idCategoria);
    }

    async obtenerSubcategoria(idSubcategoria){
        return this.manejoGaleria.obtenerSubcategoria(idSubcategoria);
    }

    async obtenerPublicaciones(idCategoria = null){
        return this.manejoGaleria.obtenerPublicaciones(idCategoria);
    }

    async agregarPublicacion(imagen, descripcion, tags, idCategoria, idSubcategoria = null){
        return this.manejoGaleria.agregarPublicacion(imagen, descripcion, tags, idCategoria, idSubcategoria);
    }

    async eliminarPublicacion(idPublicacion){
        return this.manejoGaleria.eliminarPublicacion(idPublicacion);
    }

    async agregarNotificacionCompra(idOrden){
        return this.manejoNotificaciones.agregarNotificacionCompra(idOrden);
    }

    async agregarNotificacionCita(idPublicacion, correo, mensaje){
        return this.manejoNotificaciones.agregarNotificacionCita(idPublicacion, correo, mensaje);
    }
    
    async eliminarNotificacion(idNotificacion){
        return this.manejoNotificaciones.eliminarNotificacion(idNotificacion);
    }

    async agregarCategoria(nombre){
        return this.manejoGaleria.agregarCategoria(nombre);
    }

    async eliminarCategoria(idCategoria){
        return this.manejoGaleria.eliminarCategoria(idCategoria);
    }

    async modificarCategoria(idCategoria, nombre){
        return this.manejoGaleria.modificarCategoria(idCategoria, nombre);
    }

    async modificarSubcategoria(idSubcategoria, nombre){
        return this.manejoGaleria.modificarSubcategoria(idSubcategoria, nombre);
    }

    async obtenerSubcategorias(idCategoria){
        return this.manejoGaleria.obtenerSubcategorias(idCategoria);
    }

    async agregarSubcategoria(idCategoria, nombre){
        return this.manejoGaleria.agregarSubcategoria(idCategoria, nombre);
    }

    async eliminarSubcategoria(idSubcategoria){
        return this.manejoGaleria.eliminarSubcategoria(idSubcategoria);
    }

    async obtenerNotificaciones(){
        return this.manejoNotificaciones.obtenerNotificaciones();
    }
}