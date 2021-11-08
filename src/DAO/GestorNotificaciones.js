import GestorDB from "./GestorBD";
import axios from "axios";
import FabricaNotificaciones from "../modelo/FabricaNotificaciones/FabricaNotificaciones";

export default class GestorNotificaciones extends GestorDB{
    async modificarNotificacionCompra(notificacionCompra){
        let values = {
            id: notificacionCompra.id,
            idOrdenCompra: notificacionCompra.idOrdenCompra
        }
        return axios.post('http://localhost:3001/api/modificarNotificacionCompra',values);
    }
    async modificarNotificacionCita(notificacionCita){
        let values = {
            id: notificacionCita.id,
            mensaje: notificacionCita.mensaje,
            idPublicacion: notificacionCita.idPublicacion,
            correoUsuario: notificacionCita.correoUsuario
        }
        return axios.post('http://localhost:3001/api/modificarNotificacionCita',values);
    }
    async eliminar(type, idNotificacion){
        let values = {
            idNotificacion: idNotificacion
        }
        if(type === "NotificacionCita"){
            return axios.post('http://localhost:3001/api/eliminarNotificacionCita',values);
        } else if(type === "NotificacionCompra") {
            return axios.post('http://localhost:3001/api/eliminarNotificacionCompra',values);
        }
    }

    async eliminarNotificacionDesdeOrden(type, idOrdenCompra){
        let values = {
            idOrdenCompra: idOrdenCompra
        }
        if(type === "NotificacionCompra") {
            return axios.post('http://localhost:3001/api/eliminarNotificacionDesdeOrden',values);
        }
    }
    async obtener(type, idNotificacion){
        if(type === "NotificacionCita"){
            var response = await axios.get('http://localhost:3001/api/obtenerNotificacionCita',{params: {idNotificacion: idNotificacion} });
            if(response.data.length>0){
                let notificacionCita = response.data[0];
                let c = FabricaNotificaciones.fabricarNotificacion("NotificacionCita;"+notificacionCita.idNotificacion+";"+notificacionCita.idPublicacion+";"+notificacionCita.correo+";"+notificacionCita.mensaje+";"+notificacionCita.vista);
                return c;
            }
        }else if(type === "NotificacionCompra"){
            var response = await axios.get('http://localhost:3001/api/obtenerNotificacionCompra',{params: {idNotificacion: idNotificacion} });
            if(response.data.length>0){
                let notificacionCompra = response.data[0];
                let c = FabricaNotificaciones.fabricarNotificacion("NotificacionCompra;"+notificacionCompra.idNotificacion+";"+notificacionCompra.idOrden+";"+notificacionCompra.vista);
                return c;
            }
        }
    }
    async agregarNotificacionCompra(notificacionCompra){
        let values = {
            id: notificacionCompra.id,
            idOrdenCompra: notificacionCompra.idOrdenCompra
        }
        return axios.post('http://localhost:3001/api/agregarNotificacionCompra',values);
    }
    async agregarNotificacionCita(notificacionCita){
        let values = {
            id: notificacionCita.id,
            mensaje: notificacionCita.mensaje,
            idPublicacion: notificacionCita.idPublicacion,
            correoUsuario: notificacionCita.correoUsuario
        }
        return axios.post('http://localhost:3001/api/agregarNotificacionCita',values);
    }
    async obtenerLista(){
        let notificacionesCita = await axios.get('http://localhost:3001/api/getNotificacionesCita');
        let notificacionesCompra = await axios.get('http://localhost:3001/api/getNotificacionesCompra');
        let notificaciones = [];
        notificacionesCita.data.forEach(element => {
            let notificacionCita = FabricaNotificaciones.fabricarNotificacion("NotificacionCita;"+element.ID+";"+element.idPublicacion+";"+element.correoUsuario+";"+element.mensaje+";"+element.vista)
            notificaciones.push(notificacionCita);
        });
        notificacionesCompra.data.forEach(element => {
            let notificacionCompra = FabricaNotificaciones.fabricarNotificacion("NotificacionCompra;"+element.ID+";"+element.idOrdenCompra+";"+element.vista);
            notificaciones.push(notificacionCompra);
        });
        return notificaciones;
    }
    async getNext(){
        let valor = await axios.get('http://localhost:3001/api/getNextNotificaciones');
        return valor.data[0].ultimo_valor;
    }
}