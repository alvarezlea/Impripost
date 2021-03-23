import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  listaDeProyectos : ( number | string)[][]
  
  constructor( public projectsService: ProjectsService) { 

    this.listaDeProyectos = this.projectsService.tabla;
    
  }

  ngOnInit(): void {
  }

}
