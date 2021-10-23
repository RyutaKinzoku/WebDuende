import Compromiso from "./Compromiso";
import Curso from "./Curso";
import ServicioIndividual from "./ServicioIndividual";
import Cita from "./Cita";
import Entrega from "./Entrega";

import Cita from "./Cita";

export default class FabricaCompromisos {
    static fabricarCompromiso(estructura, fechaHoraInicio, fechaHoraFin, idCompromiso, lugar, atributoDiferencial, usuario = null){
        if(estructura === "Curso"){
            return new Curso(fechaHoraInicio, fechaHoraFin, atributoDiferencial, idCompromiso, lugar);
        }else if(estructura === "Cita"){
            return new Cita(fechaHoraInicio, fechaHoraFin, idCompromiso, lugar, usuario, atributoDiferencial);
        }else if(estructura === "Entrega"){
            return new Entrega(fechaHoraInicio, fechaHoraFin, idCompromiso, lugar, usuario, atributoDiferencial);
        }else{
            throw new Error("Compromiso no existente");
        }
    }
}