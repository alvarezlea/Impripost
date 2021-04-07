import { Component, OnInit } from '@angular/core';
import { DetailsuggestionsService } from 'src/app/services/detailsuggestions.service';
import { Proyecto } from '../../models/proyecto.model'
import { Incidencia } from '../../models/incidencia.entity';
 
@Component({
  selector: 'app-detailsuggestions',
  templateUrl: './detailsuggestions.component.html',
  styleUrls: ['./detailsuggestions.component.css']
})
export class DetailsuggestionsComponent implements OnInit {

  public load: Boolean = false;

  listaDeSugerencias: Proyecto[] = [];
  page = 1;
  count = 0;
  tableSize = 5;
   
  constructor( public projectsService: DetailsuggestionsService) { }

  ngOnInit(): void {
    this.fetchPosts();   
  }

  fetchPosts(): void {
    this.projectsService.list()
      .subscribe(
        response => {
          // aplico filtro 2-sugerencia
          this.listaDeSugerencias = response.filter(data => data.tipo_proyecto_id === 2);

          this.load = true;
          
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  onTableDataChange(event){
    this.page = event;
    this.fetchPosts();
  }  

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPosts();
  } 

  ChangeStatus(id: number , status: number): void {
    
      // obtengo el proyecto por id y lleno el objeto.
      this.projectsService.listById(id)
        .subscribe(
          response => {

            var incidencia : Incidencia;
            incidencia = <Incidencia> response;
            
            // seteo el estado como leido
            incidencia.estado_id = status; 
          
            // modifico el objeto incidencia.
            this.updateProject(incidencia);

          },
          error => {
            console.log("listById"+  error);
          });
  }

  updateProject(incidencia: Incidencia){

      this.projectsService.update(incidencia)
      .subscribe(
          response => {
            console.log("update" + response);           
          },
          error => {
            console.log("update" + error);
          });  
  }

}
