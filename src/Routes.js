import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Vista/login';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/iniciar_sesion" component ={IniciarSesion}/>
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;