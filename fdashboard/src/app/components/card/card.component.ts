import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Proyecto } from '../../models/proyecto.model'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {


  listaDeTarjetas: Proyecto[] = [];
  page = 1;
  count = 0;
  tableSize = 5;
   
  constructor( public cardService: CardService) { }

  ngOnInit(): void {
    this.fetchPosts();   
  }

  fetchPosts(): void {
    this.cardService.list()
      .subscribe(
        response => {
          this.listaDeTarjetas = response.filter(data => data.tipo_proyecto_id === 1);
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
