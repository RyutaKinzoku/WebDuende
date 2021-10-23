import Compromiso from "./Compromiso";
import Curso from "./Curso";
import ServicioIndividual from "./ServicioIndividual";
import Cita from "./Cita";
import Entrega from "./Entrega";

import Cita from "./Cita";

export default class FabricaCompromisos {
    static fabricarCompromiso(estructura){
        let datos = estructura.split(';');
        if(estructura === datos[0]){
            return new Curso(datos[1], datos[2], datos[3], datos[4], datos[5]);
        }else if(estructura === "Cita"){
            return new Cita(datos[1], datos[2], datos[3], datos[4], datos[5], datos[6]);
        }else if(estructura === "Entrega"){
            return new Entrega(datos[1], datos[2], datos[3], datos[4], datos[5], datos[6]);
        }else{
            throw new Error("Compromiso no existente");
        }
    }
}