import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificarEspacios } from 'src/app/validations/espacios.validator';


@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  formu = {
    nombre : '',
    apellido : '',
    sector:'',
    sugerencia:''
  }

  f: FormGroup

  constructor(private fb: FormBuilder) { 

    this.f = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        VerificarEspacios
      ])],
      apellido: ['', Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
          VerificarEspacios
      ])],
      sector: '',
      sugerencia: '',      
    })    

  }

  ngOnInit(): void {
  }

  enviar() {
    console.log(this.f.value)
  }
    
}
