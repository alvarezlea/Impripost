import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators,  FormControl} from '@angular/forms';
import { CardService } from 'src/app/services/card.service';
import { Proyecto } from 'src/app/models/proyecto.model';
import { Incidencia } from 'src/app/models/incidencia.entity';
import { CastFormToIncidence } from 'src/app/validations/utils.validator';
import { RellenarConCerosIz } from 'src/app/validations/utils.validator';

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

  listasecuencial:number[]=[1,2,3,4,5]; 
  

  constructor(private fb: FormBuilder, private route: ActivatedRoute,public cardService: CardService) 
  { 
    this.proyectoForm = this.createFormGroup()
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



  /*
  Funcion submit
  Invoca a update del servicio.
  */  
  onSubmit(){

    let dia:string;
    let mes:string;
    let any:string;
   
    const incidencia = CastFormToIncidence(this.proyectoForm, this.dtl);

    incidencia.fecha_tentativa_inicio = this.formatDate(incidencia.fecha_tentativa_inicio);
    incidencia.fecha_tentativa_fin = this.formatDate(incidencia.fecha_tentativa_fin); 
    //NOTA
    incidencia.estado_id = incidencia.estado_id * 1; 
    incidencia.departamento = incidencia.departamento * 1; 
    this.updateProject(incidencia);

  }

  /*
  Funcion a la cual se le pasa un id
  y busca los registros desde el servicio
  */ 
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

  /*
  Funcion para modificar 
  registros desde el servicio.
  */  
  updateProject(incidencia: Incidencia){

    this.cardService.update(incidencia)
    .subscribe(
        response => {

          document.getElementById('messagesuccess').style.display = '';          
          setTimeout(function(){
            document.getElementById('messagesuccess').style.display = 'none';
          },2000);          

        },
        error => {
          document.getElementById('messagerror').style.display = '';          
          setTimeout(function(){
            document.getElementById('messagerror').style.display = 'none';
          },3000);           
        });  
  } 

  /*
  Funcion para ir cambiando el valor del progreso a media
  que voy desplazando de derecha a inzquierda.
  */
  onSearchChangeRange(searchValue: number): void { 

     this.dtl.porcentaje = searchValue;
     this.porcentajerest = ( 100 - searchValue);

  }

  /*
  Funcion que abre el popup para edita registros y ademas
  realiza una busqueda de los datos en la db.
  */
  openFormEdit(){

    this.searchById();
    document.getElementById('messagesuccess').style.display = 'none';
    document.getElementById('messagerror').style.display = 'none';

  }

  /*
  Funcion para crear un grupo
  de datos.
  */
  createFormGroup()
  {
    return  new FormGroup({
        id: new FormControl(),
        descripcion: new FormControl(),
        detalle: new FormControl(),
        timestamp: new FormControl(),
        fecha_tentativa_inicio: new FormControl(),
        fecha_tentativa_fin: new FormControl(),
        departamento: new FormControl(),
        estado_id: new FormControl(),
        tipo_proyecto_id: new FormControl(),
        usuario: new FormControl(),
        porcentaje: new FormControl()
    })
  }

  /*
  Funcion para inferir si la fecha es un objeto o un string. 
  Dependiendo del tipo aplica formato y conversion a string.
  */  
  formatDate(fecha: any): string
  {
    let dia:string;
    let mes:string;
    let any:string;    
    if( typeof(fecha) === 'object' ){
      dia = fecha['day'];
      mes = fecha['month'];
      any = fecha['year'];
      dia = RellenarConCerosIz(dia,2)
      mes = RellenarConCerosIz(mes,2)
      any = RellenarConCerosIz(any,4)
      return  any + "-" + mes + "-" + dia;
    } 
    else{fecha;
      return fecha;
    }   
  }
  
  /*
  Funcion que dado un id de estado me devuelve
  su referencia en texto.
  */
  moreState(estado: number)
  {
    let items:string[]=['Cancelado', 'Activo', 'Terminado', 'Revisando', 'Nuevo'];
    return items[estado-1];
  }

  /*
  Funcion que dado un id de estado me devuelve
  su referencia en texto.
  */
  moreDepartment(departamento: number)
  {
    let items:string[]=['Comercial', 'Sistemas', 'Gerencia', 'Administración', 'Otros'];
    return items[departamento-1];
  }  


  // onChangeDepto(searchValue: number): void { 

  //   this.dtl.departamento = searchValue;
    
  // }


}
