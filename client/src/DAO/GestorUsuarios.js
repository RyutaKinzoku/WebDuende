import GestorDB from "./GestorBD";
import Usuario from "../modelo/Usuario";
import axios from "axios";

export default class GestorUsuarios  extends GestorDB{
    modificar(usuario){}
    eliminar(correo){}
    async obtener(correo){
        var response = await axios.get('/api/obtenerUsuario',{params: {correo: correo} });
        if(response.data.length>0){
            let usuario = response.data[0];
            let u = new Usuario(usuario.correo, usuario.nombre, usuario.primerApellido, usuario.segundoApellido, usuario.telefono, usuario.cedula, usuario.contrasena, usuario.rol);
            return u;
        }
        return null;
    }
    async agregar(usuario){
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
        return axios.post('/api/agregarUsuario',values);
    }
    async obtenerLista(){
        let lista = await axios.get('/api/getUsuarios');
        console.log(lista.data);
        let usuarios = []
        lista.data.forEach(element => {
            let usuario = new Usuario(element.correo, element.nombre, element.primerApellido, element.segundoApellido, element.telefono, element.cedula, element.contrasena, element.rol);
            console.log(usuario.rol)
            if(usuario.rol !== "ADMIN"){
                usuarios.push(usuario);
            }
        });
        return usuarios;
    }

    async obtenerListaFrecuencia(){
        let lista = await axios.get('/api/getUsuariosFrecuencia');
        console.log(lista.data);
        let usuariosFrecuencia = []
        lista.data.forEach(element => {
            usuariosFrecuencia.push(element.Correo);
        });
        console.log(usuariosFrecuencia)
        return usuariosFrecuencia;
    }
}