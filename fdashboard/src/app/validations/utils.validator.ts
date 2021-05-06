import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators,  FormControl} from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto.model'
import { Incidencia } from '../models/incidencia.entity';


export function CastFormToIncidence( a: FormGroup , b: Proyecto) {

    const i = new Incidencia();
    i.id = a.value.id == null ? b.id : a.value.id
    i.descripcion = a.value.descripcion == null ? b.descripcion : a.value.descripcion
    i.detalle = a.value.detalle == null ? b.detalle : a.value.detalle
    i.timestamp = a.value.timestamp == null ? b.timestamp : a.value.timestamp
    i.fecha_tentativa_inicio = a.value.fecha_tentativa_inicio == null ? b.fecha_tentativa_inicio : a.value.fecha_tentativa_inicio
    i.fecha_tentativa_fin = a.value.fecha_tentativa_fin == null ? b.fecha_tentativa_fin : a.value.fecha_tentativa_fin
    i.departamento = a.value.departamento == null ? b.departamento : a.value.departamento
    i.estado_id = a.value.estado_id == null ? b.estado_id : a.value.estado_id
    i.tipo_proyecto_id = a.value.tipo_proyecto_id == null ? b.tipo_proyecto_id : a.value.tipo_proyecto_id
    i.usuario = a.value.usuario == null ? b.usuario : a.value.usuario
    i.porcentaje = a.value.porcentaje == null ? b.porcentaje : a.value.porcentaje

    return i;
}

export function RellenarConCerosIz(value, length) {
    return (value.toString().length < length) ? RellenarConCerosIz("0" + value, length) :  value;
}

/*
  Funcion para inferir si la fecha es un objeto o un string. 
  Dependiendo del tipo aplica formato y conversion a string.
*/  
export function formatDate(fecha: any): string
{
    let dia:string;
    let mes:string;
    let any:string;    
    if( typeof(fecha) === 'object' ){
      dia = fecha['day'];
      mes = fecha['month'];
      any = fecha['year'];
      dia = RellenarConCerosIz(dia,2)
      mes = RellenarConCerosIz(mes,2)
      any = RellenarConCerosIz(any,4)
      return  any + "-" + mes + "-" + dia;
    } 
    else{
      return fecha;
    }   
}

/*
  Funcion que dado un id de estado me devuelve
  su referencia en texto.
*/
 export function moreState(estado: number): string
{
    let items:string[]=['Cancelado', 'Activo', 'Terminado', 'Revisando', 'Nuevo'];
    return items[estado-1];
}

/*
  Funcion que dado un id de estado me devuelve
  su referencia en texto.
*/
 export function moreDepartment(departamento: number): string
{
    let items:string[]=['Comercial', 'Sistemas', 'Gerencia', 'Administración', 'Otros'];
    return items[departamento-1];
} 

 /*
  Funcion para crear un grupo
  de datos.
  */
export function createFormGroup()
{
    return  new FormGroup({
        id: new FormControl(),
        descripcion: new FormControl(),
        detalle: new FormControl(),
        timestamp: new FormControl(),
        fecha_tentativa_inicio: new FormControl(),
        fecha_tentativa_fin: new FormControl(),
        departamento: new FormControl(),
        estado_id: new FormControl(),
        tipo_proyecto_id: new FormControl(),
        usuario: new FormControl(),
        porcentaje: new FormControl()
    })
}
