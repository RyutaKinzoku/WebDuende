import React, {Component} from "react"
import { render } from "react-dom"
import FabricaCompromisos from "./modelo/FabricaCompromisos/FabricaCompromisos";

class App extends Component{
    render(){
        return(
            <h1>{new FabricaCompromisos().fabricarCompromiso("Entrega")}</h1>
        )
    }
}

render(
    <App />,
    document.getElementById('app')
)