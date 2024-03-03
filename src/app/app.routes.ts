import { HomePeliculaComponent } from './pagina/homes/home-pelicula/home-pelicula.component';
import { SeriesComponent } from './pagina/homes/series/series.component';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/homes/inicio/inicio.component';

export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: InicioComponent},
    {path: 'peliculas', component: HomePeliculaComponent},
    {path: 'series', component: SeriesComponent},
];
