import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import IniciarSesion from './Vista/IniciarSesion';
import Registrarse from './Vista/Registrarse'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component ={IniciarSesion}/>
                <Route exact path="/Registrarse" component ={Registrarse}/>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;