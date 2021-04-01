import { Component, OnInit } from '@angular/core';
import { DetailsuggestionsService } from 'src/app/services/detailsuggestions.service';
import { Proyecto } from '../../models/proyecto.model'

@Component({
  selector: 'app-detailsuggestions',
  templateUrl: './detailsuggestions.component.html',
  styleUrls: ['./detailsuggestions.component.css']
})
export class DetailsuggestionsComponent implements OnInit {

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

  cambiarestado(){
    alert("cambia el estado!");
  }


}
