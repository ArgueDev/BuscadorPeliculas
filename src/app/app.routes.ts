import { RouterModule, Routes } from '@angular/router';
import { TrailersComponent } from './pagina/trailers/trailers.component';
import { DetallesComponent } from './pagina/detalles/detalles.component';

export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', loadComponent: () => import('./pagina/homes/inicio/inicio.component')
    .then(m => m.InicioComponent)},
    {path: 'peliculas', loadComponent: () => import('./pagina/homes/home-pelicula/home-pelicula.component')
    .then(m => m.HomePeliculaComponent)},
    {path: 'series', loadComponent: () => import('./pagina/homes/series/series.component')
    .then(m => m.SeriesComponent)},
    { path: 'trailersPeliculas/:id', component: TrailersComponent, data: { tipo: 'pelicula' } },
    { path: 'trailersSeries/:id', component: TrailersComponent, data: { tipo: 'serie' } },
    { path: 'detallesPeliculas/:id', component: DetallesComponent, data: { tipo: 'pelicula' } },
    { path: 'detallesSeries/:id', component: DetallesComponent, data: { tipo: 'serie' } },
];
