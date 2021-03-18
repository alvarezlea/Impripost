import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificarEspacios } from 'src/app/validations/espacios.validator';


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

  constructor(private fb: FormBuilder) { 
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
  }

}
