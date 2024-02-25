import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pagina/home/home.component'; // Import the correct component

@Component({
    selector: 'app-root',
    standalone: true, // Remove incorrect imports
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomeComponent]
})
export class AppComponent {
  title = 'BuscadorSpotify';
}
