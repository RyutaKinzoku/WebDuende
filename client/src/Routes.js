import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Comprar from './Vista/Comprar';
import IniciarSesion from './Vista/IniciarSesion';
import Registrarse from './Vista/Registrarse'
import Galeria from './Vista/Galeria';
import CrearProducto from './Vista/CrearProducto';
import CrearPublicacion from './Vista/CrearPublicacion';
import CrearCurso from './Vista/CrearCurso';
import CrearCita from './Vista/CrearCita';
import CrearEntrega from './Vista/CrearEntrega';
import CrearCategoria from './Vista/CrearCategoria';
import CrearSubcategoria from './Vista/CrearSubcategoria';
import ModificarPublicacion from './Vista/modificarPublicacion';
import ModificarProducto from './Vista/modificarProducto';
import ModificarCategoria from './Vista/modificarCategoria';
import ModificarSubcategoria from './Vista/modificarSubcategoria';
import Compromisos from './Vista/Compromisos'
import Agenda from './Vista/Agenda';
import Tienda from './Vista/Tienda';
import Carrito from './Vista/Carrito';
import Ordenes from './Vista/Ordenes';
import VerOrden from './Vista/VerOrden';
import VerCategorias from './Vista/VerCategorias';
import VerSubcategorias from './Vista/VerSubcategorias'
import VerCurso from './Vista/VerCurso';
import VerCita from './Vista/VerCita';
import VerEntrega from './Vista/VerEntrega';
import NotificacionesCompra from './Vista/NotificacionesCompra';
import NotificacionesCita from './Vista/NotificacionesCita';
import Comentar from './Vista/Comentar';
import FrecuenciaUsuarios from './Vista/FrecuenciaUsuarios'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component ={IniciarSesion}/>
                <Route exact path="/Registrarse" component ={Registrarse}/>
                <Route exact path="/Comprar" component ={Comprar}/>
                <Route exact path="/Galeria" component ={Galeria}/>
                <Route exact path="/CrearPublicacion" component ={CrearPublicacion}/>
                <Route exact path="/CrearProducto" component ={CrearProducto}/>
                <Route exact path="/CrearCurso" component ={CrearCurso}/>
                <Route exact path="/CrearCita" component ={CrearCita}/>
                <Route exact path="/CrearEntrega" component ={CrearEntrega}/>
                <Route exact path="/CrearCategoria" component ={CrearCategoria}/>
                <Route exact path="/CrearSubcategoria/:id" component ={CrearSubcategoria}/>
                <Route exact path="/modificarPublicacion/:id" component ={ModificarPublicacion}/>
                <Route exact path="/modificarProducto/:id" component ={ModificarProducto}/>
                <Route exact path="/modificarCategoria/:id" component ={ModificarCategoria}/>
                <Route exact path="/modificarSubcategoria/:id" component ={ModificarSubcategoria}/>
                <Route exact path="/Compromisos" component ={Compromisos}/>
                <Route exact path="/Agenda" component ={Agenda}/>
                <Route exact path="/Tienda" component ={Tienda}/>
                <Route exact path="/Carrito" component ={Carrito}/>
                <Route exact path="/Ordenes" component ={Ordenes}/>
                <Route exact path="/VerOrden/:id" component ={VerOrden}/>
                <Route exact path="/VerCategorias" component = {VerCategorias}/>
                <Route exact path="/VerSubcategorias/:id" component = {VerSubcategorias}/>
                <Route exact path="/VerCurso/:id" component = {VerCurso}/>
                <Route exact path="/VerCita/:id" component = {VerCita}/>
                <Route exact path="/NotificacionesCompra" component = {NotificacionesCompra}/>
                <Route exact path="/NotificacionesCita" component = {NotificacionesCita}/>
                <Route exact path="/VerEntrega/:id" component = {VerEntrega}/>
                <Route exact path="/Comentar/:id" component = {Comentar}/>
                <Route exact path="/FrecuenciaUsuarios" component = {FrecuenciaUsuarios}/>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;