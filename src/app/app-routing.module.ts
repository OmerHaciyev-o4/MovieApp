import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryComponent } from './category/category.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';


const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/category/:categoryId', component: MoviesComponent },
  { path: 'movies/create', component: MovieCreateComponent },
  { path: 'movies/:movieId', component: MovieDetailsComponent },
  { path: 'categories/create', component: CategoryCreateComponent, },
  { path: 'auth', component: AuthComponent },

  { path: '', redirectTo: 'auth', pathMatch: 'full' },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
