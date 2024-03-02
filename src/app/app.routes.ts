import { HomePeliculaComponent } from '../app/pagina/home/home-pelicula/home-pelicula.component';
import { HomeComponent } from './pagina/home/home.component';
import { SeriesComponent } from '../app/pagina/home/series/series.component';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { InicioPeliculaComponent } from './inicio-pelicula/inicio-pelicula.component';

export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: InicioComponent},
    {path: 'peliculas', component: HomePeliculaComponent},
    {path: 'series', component: SeriesComponent},
];
