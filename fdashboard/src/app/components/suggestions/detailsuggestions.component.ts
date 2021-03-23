import { Component, OnInit } from '@angular/core';
import { DetailsuggestionsService } from 'src/app/services/detailsuggestions.service';

@Component({
  selector: 'app-detailsuggestions',
  templateUrl: './detailsuggestions.component.html',
  styleUrls: ['./detailsuggestions.component.css']
})
export class DetailsuggestionsComponent implements OnInit {


  listaDeSugerencias : ( number | string)[][]

  constructor(public detailsuggestionsService: DetailsuggestionsService) { 

    this.listaDeSugerencias = this.detailsuggestionsService.tabla;

  }

  ngOnInit(): void {
  }


  cambiarestado(){
    alert("cambia el estado!");
  }

}
