import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Proyecto } from '../../models/proyecto.model'
import { Incidencia } from '../../models/incidencia.entity';

import { ViewChild, TemplateRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-detailsuggestions',
  templateUrl: './detailsuggestions.component.html',
  styleUrls: ['./detailsuggestions.component.css']
})
export class DetailsuggestionsComponent implements OnInit {

  @ViewChild("myModalInfo", {static: false}) myModalInfo: TemplateRef<any>;
  infotxtmodal:string;

  public load: Boolean = false;

  listaDeSugerencias: Proyecto[] = [];
  listaDeSugerenciasNuevas: Proyecto[] = [];
  totmensajes:number = 0;
  page = 1;
  count = 0;
  tableSize = 5;
  iconclass="5";

  constructor( public projectsService: ProjectsService, private modalService: NgbModal) { }

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

  ChangeStatus(id: number): void {
    
      // obtengo el proyecto por id y lleno el objeto.
      this.projectsService.listById(id)
        .subscribe(
          response => {

            var incidencia : Incidencia;
            incidencia = <Incidencia> response;         

            // modifico el icono de la grilla segun corresponda.
            var icon = document.getElementById(incidencia.id.toString());
            if(incidencia.estado_id == 5){                   
              icon.classList.toggle('estatus-5'); 
              icon.classList.toggle('estatus-4');
              incidencia.estado_id = 4;   
              // abro el form modal y muestro la info del detalle.             
              this.infotxtmodal = incidencia.detalle;
              this.modalService.open(this.myModalInfo); 
            }else{              
              icon.classList.toggle('estatus-4'); 
              icon.classList.toggle('estatus-5');              
              incidencia.estado_id = 5;             
            }

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
            this.newMessageList();
          },
          error => {
            console.log("update" + error);
          });  
  }

  newMessageList(): void {
    this.projectsService.list()
      .subscribe(
        response => {
          // aplico filtro 2(Sugerencia) y estado 5(Nuevo)
          this.listaDeSugerenciasNuevas = response.filter(data => data.tipo_proyecto_id === 2 && (data.estado_id == 5));        
          this.totmensajes = this.listaDeSugerenciasNuevas.length;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }


}
