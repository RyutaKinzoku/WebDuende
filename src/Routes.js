import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Comprar from './Vista/Comprar';
import IniciarSesion from './Vista/IniciarSesion';
import Registrarse from './Vista/Registrarse'
import Galeria from './Vista/Galeria';
import CrearProducto from './Vista/CrearProducto';
import CrearPublicacion from './Vista/CrearPublicacion';
import TituloCompromiso from './Vista/TituloCompromiso';
import UsuarioCompromiso from './Vista/UsuarioCompromiso';
import DatosCompromiso from './Vista/DatosCompromiso';
import CrearCategoria from './Vista/CrearCategoria';
import CrearSubcategoria from './Vista/CrearSubcategoria';
import ModificarPublicacion from './Vista/modificarPublicacion';
import ModificarProducto from './Vista/modificarProducto';
import Compromisos from './Vista/Compromisos'
import Agenda from './Vista/Agenda';
import Tienda from './Vista/Tienda';
import Carrito from './Vista/Carrito';
function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component ={IniciarSesion}/>
                <Route exact path="/Registrarse" component ={Registrarse}/>
                <Route exact path="/Comprar" component ={Comprar}/>
                <Route exact path="/galeria" component ={Galeria}/>
                <Route exact path="/CrearPublicacion" component ={CrearPublicacion}/>
                <Route exact path="/CrearProducto" component ={CrearProducto}/>
                <Route exact path="/TituloCompromiso" component ={TituloCompromiso}/>
                <Route exact path="/UsuarioCompromiso" component ={UsuarioCompromiso}/>
                <Route exact path="/DatosCompromiso" component ={DatosCompromiso}/>
                <Route exact path="/CrearCategoria" component ={CrearCategoria}/>
                <Route exact path="/CrearSubcategoria" component ={CrearSubcategoria}/>
                <Route exact path="/modificarPublicacion" component ={ModificarPublicacion}/>
                <Route exact path="/modificarProducto" component ={ModificarProducto}/>
                <Route exact path="/Compromisos" component ={Compromisos}/>
                <Route exact path="/Agenda" component ={Agenda}/>
                <Route exact path="/Tienda" component ={Tienda}/>
                <Route exact path="/Carrito" component ={Carrito}/>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;