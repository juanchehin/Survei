export class ParteModel {
    nroparte?: number;
    receptor: string;
    referencia: string;
    turno: string;
    sector: string;
    contenido: string;
    fregistro: any;
    incidencia:any;
    idpersona: any;
    idparte?:any;
}
export class PersonaModel {
    idpersona: number;
    nombre: string;
    apellido: string;
    dni: string;
    cargo: string;
}

export class IncidenciaModel {
    idincidencia: number;
    descripcion: string;
}

export class ReporteModel {
    incidencia: string;
    sector1: number;
    sector2: number;
    sector3: number;
    
}