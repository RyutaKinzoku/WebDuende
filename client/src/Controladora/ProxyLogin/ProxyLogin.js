import GestorUsuarios from "../../DAO/GestorUsuarios";
import Gestor from "./Gestor";
import axios from "axios";

export default class ProxyLogin extends Gestor {
    constructor(){
        super();
        this.gestorUsuarios = new GestorUsuarios();
    }

    async guardarAcceso(usuario){
        if(usuario !== null){
            const fecha = new Date();
            let fechaString = ((String(fecha)).split(" GMT"))[0];
            let values = {
                correo: usuario.correo,
                fecha: fechaString
            }
            console.log(values);
            var response = await axios.post('/api/guardarAcceso', values);
        }
    }

    async obtener(correo){
        let usuario = await this.gestorUsuarios.obtener(correo);
        await this.guardarAcceso(usuario);
        return usuario; 
    }
}