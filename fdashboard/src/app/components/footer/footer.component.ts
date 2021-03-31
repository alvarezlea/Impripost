import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  rol : string

  constructor(private router:Router) { 
    this.rol  = localStorage.getItem('securityrole')
    if(this.rol != null){
      this.rol  = localStorage.getItem('securityrole').replace(/\"/g, "")
    }
    if (this.rol !== "admin") {
       this.rol = "user"
    }
  }

  ngOnInit(): void {
  }

}
