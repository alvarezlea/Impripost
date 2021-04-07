import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificarEspacios } from 'src/app/validations/espacios.validator';
import { DetailsuggestionsService } from 'src/app/services/detailsuggestions.service';
import { Incidencia } from 'src/app/models/incidencia.entity';
import { Proyecto  } from 'src/app/models/proyecto.model';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  
  listaDeSugerencias: Proyecto[] = []

  formu = {
    nombre : '',
    apellido : '',
    sector:'',
    sugerencia:''
  }

  f: FormGroup

  constructor(private fb: FormBuilder, public detailsuggestionsService: DetailsuggestionsService) { 

    this.f = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
        // VerificarEspacios
      ])],
      sector: '',
      sugerencia: '',      
    })    

  }

  ngOnInit(): void {
  }

  enviar() {

    console.log(this.f.value)   

    this.detailsuggestionsService.list()
      .subscribe(
        response => {
          // Obtengo el ultimo ID
          const max = response.reduce((prev, current) => (prev.id > current.id) ? prev : current)

          // Instancio el objeto a insertar.
          let incidencia = new Incidencia();
          incidencia.id = (max.id + 1);
          incidencia.estado_id = 5;
          incidencia.detalle = this.f.value.sugerencia;
          incidencia.departamento = this.f.value.sector;   
          incidencia.usuario = this.f.value.nombre;          

          // Guardo el objeto recien creado.
          this.detailsuggestionsService.save(incidencia)
          .subscribe(
            response => {
              console.log(response);           
            },
            error => {
              console.log(error);
            });
        },
        error => {
          console.log(error);
        });  
  }

}
