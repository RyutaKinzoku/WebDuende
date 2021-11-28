import GestorUsuarios from "../../DAO/GestorUsuarios";
import Gestor from "./Gestor";
import axios from "axios";

export default class ProxyLogin extends Gestor {
    constructor(){
        super();
        this.gestorUsuarios = new GestorUsuarios();
    }

    async guardarAcceso(correo){
        let usuario = await this.gestorUsuarios.obtener(correo);
        if(usuario !== null){
            const fecha = new Date();
            let fechaString = ((String(fecha)).split(" GMT"))[0];
            console.log(fechaString);
            let values = {
                correo: usuario.correo,
                fecha: fechaString
            }
            console.log(values);
            var response = await axios.post('/api/guardarAcceso', values);
        }
        return usuario
    }

    async obtener(correo){
        return await this.guardarAcceso(correo);
    }
}