import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  rol : string = "";

  constructor(private router:Router) 
  {   
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


  salir(){
    
    localStorage.removeItem('securityrole');
    localStorage.clear();    

    this.router.navigate(['dashboard'])
    .then(() => {
      window.location.reload();
    });

  }

}
