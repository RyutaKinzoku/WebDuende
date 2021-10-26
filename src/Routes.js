import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Comprar from './Vista/Comprar';
import IniciarSesion from './Vista/IniciarSesion';
import Registrarse from './Vista/Registrarse'
import Galeria from './Vista/Galeria';
import CrearProducto from './Vista/CrearProducto';
import CrearPublicacion from './Vista/CrearPublicacion';
import CrearCompromiso from './Vista/CrearCompromiso';

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
                <Route exact path="/CrearCompromiso" component ={CrearCompromiso}/>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;