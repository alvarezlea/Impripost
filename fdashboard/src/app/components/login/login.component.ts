import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { VerificarEspacios } from 'src/app/validations/espacios.validator';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User[] = [];

  formu = {
    usuario : '',
    clave : ''
  }

  f: FormGroup

  constructor(private fb: FormBuilder, private router:Router, private userService:UserService) { 
    this.f = fb.group({
      usuario: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        VerificarEspacios
      ])],
      clave: ['', Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
          VerificarEspacios
        ])]
    })
  }

  ngOnInit(): void {
    document.getElementById('messageAuthentication').style.display = 'none';
  }

  enviar() {
    console.log(this.f.value)
    
    this.authentication(this.f.value.usuario,this.f.value.clave)

  }

  authentication(u: string, p: string): void {
    this.userService.list()
      .subscribe(
        response => {
          this.user = response.filter(data => data.nombre_apellido == u && data.password == p);
          if((this.user.length > 0) && (this.user[0].rol == "admin"))
          {
              console.log("Autentificacion exitosa! " + this.user[0].rol);
              // Seteo el rol de administrador.
              localStorage.setItem('securityrole', JSON.stringify('admin'));
              this.router.navigate(['dashboard'])
              .then(() => {
                window.location.reload();
              });
          }else{
            document.getElementById('messageAuthentication').style.display = '';          
            setTimeout(function(){
              document.getElementById('messageAuthentication').style.display = 'none';
            },2000);   
            this.f.reset();          
          }
        },
        error => {
          console.log(error);
        });
  }

   
  // enviar() {
  //   console.log(this.f.value)
    
  //   if( (this.f.value.usuario == "admin") &&  (this.f.value.clave === "admin")){
  //     console.log("Autentificacion exitosa!");

  //     localStorage.setItem('securityrole', JSON.stringify('admin'));

  //     this.router.navigate(['dashboard'])
  //     .then(() => {
  //       window.location.reload();
  //     });
  //   }

  // }



}


