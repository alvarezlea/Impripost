import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  // tarjetasDelServicio : string[]
  // tarjetasDelServicioHash : Map<string, string>
  tarjetasDelServicioMulti : ( number | string)[][]

  constructor(public cardService : CardService ) 
  { 
    // this.tarjetasDelServicio = this.cardService.data;
    // this.tarjetasDelServicioHash = this.cardService.myMap;
    this.tarjetasDelServicioMulti = this.cardService.multi;
  }


  ngOnInit(): void {
  }

}
