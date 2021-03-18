import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SuggestionsComponent } from  './components/suggestions/suggestions.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';


// Aqui especifico las rutas de la aplicacion

const routes : Routes = [
  { path: '', redirectTo:'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'suggestion', component: SuggestionsComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,    
    LoginComponent,
    SuggestionsComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      { enableTracing : false }
    ),
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
