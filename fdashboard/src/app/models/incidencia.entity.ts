import { Proyecto } from "./proyecto.model";

export class Incidencia implements Proyecto  {

    public id: number;
    public descripcion: string;
    public detalle: string;
    public timestamp: string;
    public fecha_tentativa_inicio: string;
    public fecha_tentativa_fin: string;
    public departamento: number;
    public porcentaje: number;
    public estado_id: number;
    public tipo_proyecto_id: number;
    public usuario: string;

    constructor() {
        this.id = 0;
        this.descripcion = "";
        this.detalle= "";
        this.timestamp= "";
        this.fecha_tentativa_inicio= "9999-99-99";
        this.fecha_tentativa_fin= "9999-99-99";
        this.departamento= 5;                      //'Comercial', 'Sistemas', 'Gerencia', 'Administración', 'Otros'
        this.porcentaje= 0;
        this.estado_id = 5;                        //'Cancelado', 'Activo', 'Terminado', 'Revisando', 'Nuevo'
        this.tipo_proyecto_id  = 1;                //'Proyecto','Sugerencia'
        this.usuario= "";
    }
       
}
