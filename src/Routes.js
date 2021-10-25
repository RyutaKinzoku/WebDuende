import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import IniciarSesion from './Vista/IniciarSesion';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component ={IniciarSesion}/>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;