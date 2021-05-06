import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificarEspacios } from 'src/app/validations/espacios.validator';
import { ProjectsService } from 'src/app/services/projects.service';
import { Incidencia } from 'src/app/models/incidencia.entity';
import { Proyecto  } from 'src/app/models/proyecto.model';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  
  listaDeSugerencias: Proyecto[] = []

  f: FormGroup

  constructor(private fb: FormBuilder, public detailsuggestionsService: ProjectsService) { 

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
    document.getElementById('alertsuccess').style.display = 'none';
    document.getElementById('alerterror').style.display = 'none';    
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
          incidencia.descripcion = "Proyecto Nuevo";
          incidencia.detalle = this.f.value.sugerencia;
          incidencia.departamento = this.f.value.sector * 1;   
          incidencia.porcentaje = 0;
          incidencia.tipo_proyecto_id = 2;
          incidencia.usuario = this.f.value.nombre;          

          // Limpio los campos de los formularios.
          this.f = this.fb.group({
            nombre: ['', Validators.compose([
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(30)
              // VerificarEspacios
            ])],
            sector: '',
            sugerencia: '',      
          }) 

          // Guardo el objeto recien creado.
          this.detailsuggestionsService.save(incidencia)
          .subscribe(
            response => {
              console.log(response);   

              document.getElementById('alertsuccess').style.display = '';          
              setTimeout(function(){
                document.getElementById('alertsuccess').style.display = 'none';
                
                this.f.reset();

              },2000);            
            },
            error => {
              console.log(error);

              document.getElementById('alerterror').style.display = '';          
              setTimeout(function(){
                document.getElementById('alerterror').style.display = 'none';
              },3000);                 
            });
      },
      error => {
          console.log(error);
      });  
  }

}
