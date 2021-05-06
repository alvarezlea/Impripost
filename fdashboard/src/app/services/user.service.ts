import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}  from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../app.setting'
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})


export class UserService {

  // Url acceso BackEnd
  private urlEndPoint :string = AppSettings.API_ENDPOINT;
  private HttpHeaders  = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  constructor(private http:HttpClient) { }


  list():Observable<User[]>{

    return this.http.get<User[]>(`${this.urlEndPoint}/usuarios`,{headers: this.HttpHeaders});

  }
  
  listById(id:number):Observable<User>{

    return this.http.get<User>(`${this.urlEndPoint}/usuarios/${id}`,{headers: this.HttpHeaders});

  }

  save(sUsuario:User):Observable<User>{  
  
    return this.http.post<User>(`${this.urlEndPoint}/usuarios`,sUsuario,{headers: this.HttpHeaders}); 

  }
  
  delete(id:number){  
 
    return this.http.delete<User>(`${this.urlEndPoint}/usuarios/${id}`,{headers:this.HttpHeaders});

  }
  
  update(sUsuario:User):Observable<User>{

    return this.http.put<User>(`${this.urlEndPoint}/usuarios/${sUsuario.id}`,sUsuario,{headers: this.HttpHeaders}).pipe(
  
      map((resp:any)=>{return resp.mess})
  
    )
  
  } 

}
