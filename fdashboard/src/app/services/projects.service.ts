import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}  from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Proyecto } from '../models/proyecto.model';

@Injectable({
  providedIn: 'root'
})


export class ProjectsService {

  //Titulo	Descripción	Fecha creación	Fecha final	Progreso Estado
  tabla = [ 
    [1, "Chat boot IA","Se trata de un proyecto que se penso con la idea de dar un servicio de chat desantendido.","01/03/2021","26/05/2021","%40",1], 
    [2, "Desarrollo Web Mobile","Proyecto para armar un departamento de desarrollo para dispositivos móviles.","01/03/2021","26/05/2021","%25",1], 
    [3, "Desarrollo xx1", "Es simplemente texto de relleno.Es simplemente texto de relleno.Es simplemente texto de relleno.","01/03/2021","26/05/2021","%0",1], 
    [4, "Desarrollo xx2", "Es simplemente texto de relleno.Es simplemente texto de relleno.Es simplemente texto de relleno.","01/03/2021","26/05/2021","%10",1], 
    [5, "Desarrollo xx3", "Es simplemente texto de relleno.Es simplemente texto de relleno.Es simplemente texto de relleno.","01/03/2021","26/05/2021","%100",1]
  ]

  private urlEndPoint :string ="https://6063658d0133350017fd32f4.mockapi.io/proyectos";
  private HttpHeaders  = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  constructor(private http:HttpClient) { }


  list():Observable<Proyecto[]>{

    // return this.http.get<Proyecto[]>(`${this.urlEndPoint}`,{headers: this.HttpHeaders}).pipe(
    //     map( (resp:any) => { return resp.lista})
    // )
  
    return this.http.get<Proyecto[]>(`${this.urlEndPoint}`,{headers: this.HttpHeaders});
  }
  
  save(sProyecto:Proyecto):Observable<Proyecto>{
  
    return this.http.post<Proyecto>(this.urlEndPoint,sProyecto,{headers: this.HttpHeaders});
  
  }
  
  delete(id:number):Observable<Proyecto>{
  
    return this.http.delete<Proyecto>(`${this.urlEndPoint}/${id}`,{headers:this.HttpHeaders})
  
  }
  
  update(sProyecto:Proyecto):Observable<Proyecto>{
  
    return this.http.put<Proyecto>(this.urlEndPoint,sProyecto,{headers: this.HttpHeaders}).pipe(
  
      map((resp:any)=>{return resp.mess})
  
    )
  
  } 

}
