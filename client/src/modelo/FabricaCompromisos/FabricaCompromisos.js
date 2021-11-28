import Compromiso from "./Compromiso";
import Curso from "./Curso";
import ServicioIndividual from "./ServicioIndividual";
import Cita from "./Cita";
import Entrega from "./Entrega";

export default class FabricaCompromisos {
    static fabricarCompromiso(estructura){
        let datos = estructura.split(';');
        if(datos[0] == "Curso"){
            return new Curso(datos[1], datos[2], datos[3], datos[4], datos[5]);
        }else if(datos[0] == "Cita"){
            return new Cita(datos[1], datos[2], datos[3], datos[4], datos[5], datos[6]);
        }else if(datos[0] == "Entrega"){
            return new Entrega(datos[1], datos[2], datos[3], datos[4], datos[5], datos[6]);
        }else{
            throw new Error("Compromiso no existente");
        }
    }
}