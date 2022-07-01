import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movies/movie/movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FooterComponent } from './footer/footer.component';
import { MovieFilterPipe } from './pipes/movie-filter.pipe';
import { AlertifyService } from './services/alertify.services';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule], // modules
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryComponent,
    MoviesComponent,
    MovieComponent,
    MovieDetailsComponent,
    FooterComponent,
    MovieFilterPipe,
    MovieCreateComponent,
    CategoryCreateComponent,
    AuthComponent,
  ], //component  providers - services
  providers: [AlertifyService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent], //starter component
})
export class AppModule { }
