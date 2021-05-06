import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators,  FormControl} from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Incidencia } from 'src/app/models/incidencia.entity';
import { ProjectsService } from 'src/app/services/projects.service';

import { CastFormToIncidence } from 'src/app/validations/utils.validator';
import { createFormGroup } from 'src/app/validations/utils.validator';
import { moreState } from 'src/app/validations/utils.validator';
import { moreDepartment } from 'src/app/validations/utils.validator';
import { formatDate } from 'src/app/validations/utils.validator';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  
  model: NgbDateStruct;
  rol : string = "";
  form: FormGroup
  porcentajerest:number = 0;
  @Input() totmensajes:number = 0;
  listaDeSugerenciasNuevas: Proyecto[] = [];

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
    porcentaje: 50,
  }

  listasecuencial:number[]=[1,2,3,4,5]; 


  constructor(private fb: FormBuilder, private router:Router, public projectService: ProjectsService) 
  {   
      this.rol  = localStorage.getItem('securityrole')
      if(this.rol != null){
        this.rol  = localStorage.getItem('securityrole').replace(/\"/g, "")
      }
      if (this.rol !== "admin") {
        this.rol = "user"
      }
      this.form = createFormGroup()
  }


  ngOnInit(): void {
    this.newMessageList();
  }

  openFormAdd(){
      document.getElementById('messagesuccess').style.display = 'none';
      document.getElementById('messagerror').style.display = 'none';
  }

  salir(){    
      localStorage.removeItem('securityrole');
      localStorage.clear();    

      this.router.navigate(['dashboard'])
      .then(() => {
        window.location.reload();
      });
  }

  onSubmit(){


      this.projectService.list()
      .subscribe(
        response => {
          // Obtengo el ultimo ID
          const max = response.reduce((prev, current) => (prev.id > current.id) ? prev : current)

          // Instancio el objeto a insertar.
          let incidencia = new Incidencia();
          incidencia.id = (max.id + 1);
          incidencia.estado_id = 5;
          incidencia.descripcion = this.form.value.descripcion;  
          incidencia.detalle = this.form.value.detalle;       
          incidencia.porcentaje = 50;
          incidencia.tipo_proyecto_id = 1;
          incidencia.usuario = this.form.value.usuario;          
          incidencia.fecha_tentativa_inicio = this.FormatDate(this.form.value.fecha_tentativa_inicio);
			    incidencia.fecha_tentativa_fin = this.FormatDate(this.form.value.fecha_tentativa_fin);
          if(this.form.value.departamento == ""){
            incidencia.departamento = 5;
          }else{
            incidencia.departamento = this.form.value.departamento * 1;  
          }

          // Limpio los campos de los formularios.
          this.form = createFormGroup()

          // Guardo el objeto recien creado.
          this.projectService.save(incidencia)
          .subscribe(
            response => {
              console.log(response);   

              document.getElementById('messagesuccess').style.display = '';          
              setTimeout(function(){
                document.getElementById('messagesuccess').style.display = 'none';                
              },2000);            
            },
            error => {
              console.log(error);

              document.getElementById('messagerror').style.display = '';          
              setTimeout(function(){
                document.getElementById('messagerror').style.display = 'none';
              },3000);                 
            });
      },
      error => {
          console.log(error);
      });      
 

  }
  
  newMessageList(): void {
    this.projectService.list()
      .subscribe(
        response => {
          // aplico filtro 2(Sugerencia) y estado 5(Nuevo)
          this.listaDeSugerenciasNuevas = response.filter(data => data.tipo_proyecto_id === 2 && (data.estado_id == 5));        
          this.totmensajes = this.listaDeSugerenciasNuevas.length;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }


  FormatDate(fecha: any): string
  {   
    return formatDate(fecha);
  }

  ListState(estado: number)
  {
      return moreState(estado);
  }

  ListDepartment(departamento: number)
  {
      return moreDepartment(departamento);
  } 

  onSearchChangeRange(searchValue: number): void 
  { 
      /*Funcion para ir cambiando el valor del progreso a media
      que voy desplazando de derecha a inzquierda.*/
      this.dtl.porcentaje = searchValue;
      this.porcentajerest = ( 100 - searchValue);
  }  

  cancelar(){
    this.form = createFormGroup();
  }

}
