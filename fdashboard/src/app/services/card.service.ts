import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}  from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../app.setting'
import { Proyecto } from '../models/proyecto.model';

@Injectable({
  providedIn: 'root'
})

export class CardService {

  // Url acceso BackEnd
  private urlEndPoint :string = AppSettings.API_ENDPOINT; 
  private HttpHeaders  = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  constructor(private http:HttpClient) { }

  listById(id:number):Observable<Proyecto>{

    return this.http.get<Proyecto>(`${this.urlEndPoint}/proyectos/${id}`,{headers: this.HttpHeaders});

  }

  list():Observable<Proyecto[]>{

    return this.http.get<Proyecto[]>(`${this.urlEndPoint}/proyectos`,{headers: this.HttpHeaders});

  }
  
  save(sProyecto:Proyecto):Observable<Proyecto>{
  
    return this.http.post<Proyecto>(`${this.urlEndPoint}/proyectos`,sProyecto,{headers: this.HttpHeaders});
  
  }
  
  delete(id:number):Observable<Proyecto>{
  
    return this.http.delete<Proyecto>(`${this.urlEndPoint}/proyectos/${id}`,{headers:this.HttpHeaders})
  
  }
  
  update(sProyecto:Proyecto):Observable<Proyecto>{

    return this.http.put<Proyecto>(`${this.urlEndPoint}/proyectos/${sProyecto.id}`,sProyecto,{headers: this.HttpHeaders}).pipe(
  
      map((resp:any)=>{return resp.mess})
  
    )
  
  } 



}
