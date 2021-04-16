import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model: NgbDateStruct;
  rol : string = "";
  lista:string[]=["Activo","Terminado","Cancelado"];
  seleccionados:string[]=[];

  f: FormGroup

  constructor(private fb: FormBuilder, private router:Router) 
  {   
    this.rol  = localStorage.getItem('securityrole')
    if(this.rol != null){
      this.rol  = localStorage.getItem('securityrole').replace(/\"/g, "")
    }
    if (this.rol !== "admin") {
       this.rol = "user"
    }


    this.f = fb.group({
      nombre: '',
      sector: '',
      sugerencia: '',      
    })


  }


  ngOnInit(): void {
  }


  salir(){
    
    localStorage.removeItem('securityrole');
    localStorage.clear();    

    this.router.navigate(['dashboard'])
    .then(() => {
      window.location.reload();
    });

  }


  enviar() {

    console.log(this.f.value);

  }  


}
