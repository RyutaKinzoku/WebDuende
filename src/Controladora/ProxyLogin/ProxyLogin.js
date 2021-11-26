import GestorUsuarios from "../../DAO/GestorUsuarios";
import Gestor from "./Gestor";
import axios from "axios";

export default class ProxyLogin extends Gestor {
    constructor(){
        super();
        this.gestorUsuarios = new GestorUsuarios();
    }

    async guardarAcceso(correo){
        let usuario = this.gestorUsuarios.obtener(correo);
        let values = {
            correo: usuario.correo,
            nombre: usuario.nombre,
            primerApellido: usuario.primerApellido,
            segundoApellido: usuario.segundoApellido,
            telefono: usuario.telefono,
            cedula: usuario.cedula,
            contrasena: usuario.contrasena,
            rol: usuario.rol
        }
        axios.post('https://web-duende-server.herokuapp.com/api/guardarAcceso',values);
        return usuario
    }

    async obtener(correo){
        return await this.guardarAcceso(correo);
    }
}