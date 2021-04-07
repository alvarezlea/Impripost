import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Proyecto } from '../../models/proyecto.model'
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  public load: Boolean = false;
  model: NgbDateStruct;
  listaDeProyectos: Proyecto[] = [];
  page = 1;
  count = 0;
  tableSize = 5;
   

  constructor( public projectsService: ProjectsService) { }

  ngOnInit(): void {
    
    this.fetchPosts();   
  }

  fetchPosts(): void {
    this.projectsService.list()
      .subscribe(
        response => {
          this.listaDeProyectos = response.filter(data => data.tipo_proyecto_id === 1);
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

}
