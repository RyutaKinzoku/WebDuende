import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import IniciarSesion from './Vista/IniciarSesion';
import Registrarse from './Vista/Registrarse'
import Galeria from './Vista/Galeria';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component ={IniciarSesion}/>
                <Route exact path="/Registrarse" component ={Registrarse}/>
                <Route exact path="/galeria" component ={Galeria}/>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;