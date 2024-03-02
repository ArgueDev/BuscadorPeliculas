import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pagina/home/home.component';
import { NavigationComponent } from "./pagina/navigation/navigation.component";
import { HomePeliculaComponent } from "./pagina/home/home-pelicula/home-pelicula.component";
import { SeriesComponent } from "./pagina/home/series/series.component"; // Import the correct component

@Component({
    selector: 'app-root',
    standalone: true, // Remove incorrect imports
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomeComponent, NavigationComponent, HomePeliculaComponent, SeriesComponent]
})
export class AppComponent {
  title = 'BuscadorSpotify';
}
