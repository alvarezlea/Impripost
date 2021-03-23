import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  tabla = [ 
    //Titulo	Descripción	Fecha creación	Fecha final	Progreso Estado
    [1, "Chat boot IA","Se trata de un proyecto que se penso con la idea de dar un servicio de chat desantendido.","01/03/2021","26/05/2021","%40",1], 
    [2, "Desarrollo Web Mobile","Proyecto para armar un departamento de desarrollo para dispositivos móviles.","01/03/2021","26/05/2021","%25",1], 
    [3, "Desarrollo xx1", "Es simplemente texto de relleno.Es simplemente texto de relleno.Es simplemente texto de relleno.","01/03/2021","26/05/2021","%0",1], 
    [4, "Desarrollo xx2", "Es simplemente texto de relleno.Es simplemente texto de relleno.Es simplemente texto de relleno.","01/03/2021","26/05/2021","%10",1], 
    [5, "Desarrollo xx3", "Es simplemente texto de relleno.Es simplemente texto de relleno.Es simplemente texto de relleno.","01/03/2021","26/05/2021","%100",1]
  ]

  constructor() { }
}
