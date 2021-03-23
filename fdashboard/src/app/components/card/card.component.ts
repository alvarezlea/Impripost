import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  tarjetasDelServicioMulti : ( number | string)[][]

  constructor(public cardService : CardService ) 
  { 
    this.tarjetasDelServicioMulti = this.cardService.tabla;
  }


  ngOnInit(): void {
  }

}
