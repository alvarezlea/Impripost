import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Proyecto } from '../../models/proyecto.model'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  // listaDeProyectos : ( number | string)[][]

   listaDeProyectos: Proyecto[] = [];
  
  constructor( public projectsService: ProjectsService) { 
    // this.listaDeProyectos = this.projectsService.tabla;
  }

  ngOnInit(): void {

    this.projectsService.list().subscribe(data => {
      this.listaDeProyectos = data;
      // console.log(this.listaDeProyectos);

      for (let entry of this.listaDeProyectos.entries()) {
        console.log(entry[0], entry[1].descripcion);   
      }    



    });

    //Iterate over map entries
    // console.log("PASO...");
    // for (let entry of this.listaDeProyectos.entries()) {
    //     console.log(entry[0], entry[1]);   
    // }    

  }


}
