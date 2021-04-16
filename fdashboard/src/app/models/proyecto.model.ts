export interface Proyecto {
  id: number;
  descripcion: string;
  detalle: string;
  timestamp: string;
  fecha_tentativa_inicio: string;
  fecha_tentativa_fin: string;
  departamento: number;
  porcentaje: number;
  estado_id: number;
  tipo_proyecto_id: number;
  usuario: string;
}
