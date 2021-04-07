import { Proyecto } from "./proyecto.model";

export class Incidencia implements Proyecto  {

    public id: number;
    public descripcion: string;
    public detalle: string;
    public timestamp: string;
    public fecha_tentativa_inicio: string;
    public fecha_tentativa_fin: string;
    public departamento: string;
    public porcentaje: string;
    public estado_id: number;
    public tipo_proyecto_id: number;
    public usuario: string;

    constructor() {
        this.id = 0;
        this.descripcion = "";
        this.detalle= "";
        this.timestamp= "";
        this.fecha_tentativa_inicio= "";
        this.fecha_tentativa_fin= "";
        this.departamento= "";
        this.porcentaje= "0";
        this.estado_id = 1;
        this.tipo_proyecto_id  = 2;
        this.usuario= "";
    }
              
}
