import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificarEspacios } from 'src/app/validations/espacios.validator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formu = {
    usuario : '',
    clave : ''
  }

  f: FormGroup

  constructor(private fb: FormBuilder, private router:Router) { 
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
  }

  enviar() {
    console.log(this.f.value)
    
    if( (this.f.value.usuario == "admin") &&  (this.f.value.clave === "admin")){
      console.log("Autentificacion exitosa!");

      // Seteo el rol de administrador.
      localStorage.setItem('securityrole', JSON.stringify('admin'));

      this.router.navigate(['dashboard'])
      .then(() => {
        window.location.reload();
      });


    }


  }

}
