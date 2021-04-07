import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Aqui importo mis componentes para usarlos en la app principal

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { DetailcardComponent} from './components/card/detailcard.component';
import { SuggestionsComponent } from  './components/suggestions/suggestions.component';
import { DetailsuggestionsComponent} from './components/suggestions/detailsuggestions.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// Aqui especifico las rutas de la aplicacion

const routes : Routes = [
  { path: '', redirectTo:'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'suggestion', component: SuggestionsComponent},
  { path: 'detailcard/:id', component: DetailcardComponent},
  { path: 'detailsuggestions', component: DetailsuggestionsComponent},
  { path: 'projects' , component: ProjectsComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,    
    LoginComponent,
    NavbarComponent,
    CardComponent,
    DetailcardComponent,
    SuggestionsComponent,    
    DetailsuggestionsComponent, ProjectsComponent, FooterComponent
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
    FontAwesomeModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
