import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}  from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Proyecto } from '../models/proyecto.model';


@Injectable({
  providedIn: 'root'
})


export class DetailsuggestionsService {

  // nombre,apellido,descripcion,estado
  tabla = [ 
    [1, "Nombre demo 1", "Apellido demo 1","Administración","es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",0], 
    [2, "Nombre demo 2", "Apellido demo 2","Comercial","es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",1], 
    [3, "Nombre demo 3", "Apellido demo 3","Sistemas","es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",0], 
    [4, "Nombre demo 4", "Apellido demo 4","Gerencia","es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",0], 
    [5, "Nombre demo 5", "Apellido demo 5","Comercial","es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",1], 
  ]

  private urlEndPoint :string ="https://6063658d0133350017fd32f4.mockapi.io/proyectos";
  private HttpHeaders  = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  constructor(private http:HttpClient) { }


  list():Observable<Proyecto[]>{

    return this.http.get<Proyecto[]>(`${this.urlEndPoint}`,{headers: this.HttpHeaders}).pipe(
        map( (resp:any) => { return resp.lista})
    )
  
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
