/*import Compromiso from "./Compromiso";
import Curso from "./Curso";
import ServicioIndividual from "./ServicioIndividual";
import Cita from "./Cita";
import Entrega from "./Entrega";*/

export default class FabricaCompromisos {
    fabricarCompromiso(estructura){
        if(estructura === "Curso"){
            return "Compromiso Curso";
        }else if(estructura === "Cita"){
            return "Compromiso Cita";
        }else if(estructura === "Entrega"){
            return "Compromiso Entrega";
        }else{
            return "Compromiso no existente";
        }
    }
}