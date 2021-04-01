import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}  from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../app.setting'
import { Proyecto } from '../models/proyecto.model';

@Injectable({
  providedIn: 'root'
})


export class ProjectsService {

  // Url acceso BackEnd
  private urlEndPoint :string = AppSettings.API_ENDPOINT; 
  private HttpHeaders  = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  constructor(private http:HttpClient) { }


  list():Observable<Proyecto[]>{

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
