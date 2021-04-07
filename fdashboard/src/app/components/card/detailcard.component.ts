import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { Proyecto } from '../../models/proyecto.model'

@Component({
  selector: 'app-detailcard',
  templateUrl: './detailcard.component.html',
  styleUrls: ['./detailcard.component.css']
})

export class DetailcardComponent implements OnInit {

  private sub: any;
  tarjeta: Proyecto;

  id: number
  descripcion: string
  detalle: string
  timestamp: string
  facha_tentativa_inicio: string
  fecha_tentativa_fin: string
  departamento: string
  Sistemas: string
  estado_id: number
  tipo_proyecto_id: number
  usuario: string
  porcentaje: string


  constructor(private route: ActivatedRoute, public cardService: CardService) { }

  ngOnInit(): void {
  
      // Recupero el parametro id de la url
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; 
      });

      this.searchById();        
  
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  searchById(): void{

    this.cardService.listById(this.id)
      .subscribe(
        response => {
          this.tarjeta = response;
          console.log(response);

          this.id = this.tarjeta.id;
          this.descripcion = this.tarjeta.descripcion;
          this.detalle = this.tarjeta.detalle;
          this.timestamp = this.tarjeta.timestamp;
          this.facha_tentativa_inicio = this.tarjeta.fecha_tentativa_inicio;
          this.fecha_tentativa_fin = this.tarjeta.fecha_tentativa_fin;
          this.departamento = this.tarjeta.departamento;
          this.estado_id = this.tarjeta.estado_id;
          this.tipo_proyecto_id = this.tarjeta.tipo_proyecto_id;
          this.usuario = this.tarjeta.usuario;
          this.porcentaje = this.tarjeta.porcentaje;
          
        },
        error => {
          console.log(error);
        });
 
  }  

}
