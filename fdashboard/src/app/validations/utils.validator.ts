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
