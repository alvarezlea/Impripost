import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators,  FormControl} from '@angular/forms';
import { ProjectsService } from 'src/app/services/projects.service';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Incidencia } from 'src/app/models/incidencia.entity';

import { CastFormToIncidence } from 'src/app/validations/utils.validator';
import { RellenarConCerosIz } from 'src/app/validations/utils.validator';
import { createFormGroup } from 'src/app/validations/utils.validator';
import { moreState } from 'src/app/validations/utils.validator';
import { moreDepartment } from 'src/app/validations/utils.validator';
import { formatDate } from 'src/app/validations/utils.validator';

@Component({
  selector: 'app-detailcard',
  templateUrl: './detailcard.component.html',
  styleUrls: ['./detailcard.component.css']
})

export class DetailcardComponent implements OnInit {

  private sub: any
  model: NgbDateStruct
  ide: number
  proyectoForm: FormGroup
  porcentajerest:number = 0;
  listasecuencial:number[]=[1,2,3,4,5]; 

  dtl: Proyecto = {
      id: 0,
      descripcion: '',
      detalle: '',
      timestamp: '',
      fecha_tentativa_inicio: '',
      fecha_tentativa_fin: '',
      departamento: 0,
      estado_id: 0,
      tipo_proyecto_id: 0,
      usuario: '',
      porcentaje: 0,
  }

 
  constructor(private fb: FormBuilder, private route: ActivatedRoute,public cardService: ProjectsService) 
  { 
      this.proyectoForm = createFormGroup()
      this.sub = this.route.params.subscribe(params => { // recupero el parametro parametro desde la url...
          this.ide = +params['id']; 
      });    
  }

  ngOnInit(): void {
     this.searchById();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  onSubmit(){

    let dia:string;
    let mes:string;
    let any:string;
   
    const incidencia = CastFormToIncidence(this.proyectoForm, this.dtl);

    incidencia.fecha_tentativa_inicio = this.FormatDate(incidencia.fecha_tentativa_inicio);
    incidencia.fecha_tentativa_fin = this.FormatDate(incidencia.fecha_tentativa_fin); 
    incidencia.estado_id = incidencia.estado_id * 1; 
    incidencia.departamento = incidencia.departamento * 1; 
    this.updateProject(incidencia);

  }

  searchById(){
    
    this.cardService.listById(this.ide)
        .subscribe(
            response => {   
              console.log(response)            
              this.dtl = response;
              this.porcentajerest = (100 - this.dtl.porcentaje);
            },
            error => {
              console.log(error);
            });
  }  

  updateProject(incidencia: Incidencia){

    this.cardService.update(incidencia)
    .subscribe(
        response => {

          document.getElementById('messageSuccess').style.display = '';          
          setTimeout(function(){
            document.getElementById('messageSuccess').style.display = 'none';
          },2000);          

        },
        error => {
          document.getElementById('messageError').style.display = '';          
          setTimeout(function(){
            document.getElementById('messageError').style.display = 'none';
          },3000);           
        });  
  } 

  onSearchChangeRange(searchValue: number): void { 

    /*Funcion para ir cambiando el valor del progreso a media
    que voy desplazando de derecha a inzquierda.*/
     this.dtl.porcentaje = searchValue;
     this.porcentajerest = ( 100 - searchValue);

  }

  openFormEdit(){

    this.searchById();
    document.getElementById('messageSuccess').style.display = 'none';
    document.getElementById('messageError').style.display = 'none';

  }

  FormatDate(fecha: any): string
  {   
    return formatDate(fecha);
  }
  
  ListState(estado: number)
  {
    return  moreState(estado);
  }

  ListDepartment(departamento: number)
  {
    return moreDepartment(departamento);
  }  

}
