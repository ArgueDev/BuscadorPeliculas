import { Component, Input, OnInit } from '@angular/core';
import { BuscadorPeliculasService } from '../../Services/api.service';
import { Route, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-trailers',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './trailers.component.html',
  styleUrl: './trailers.component.css'
})
export class TrailersComponent implements OnInit{
  trailerKey: any[] = [];
  movieId: number | undefined;
  safeURL: SafeResourceUrl | undefined;
  mensajeNoVideo: string = '';

  constructor(private api: BuscadorPeliculasService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
    this.getTrailer();
  }


  private getTrailer(): void {
    this.route.params.subscribe(params => {
      this.movieId = +params['id']; // Convertir el ID a número
      const tipo = this.route.snapshot.data['tipo']; // Obtener el tipo de contenido de los datos de la ruta
      if (this.movieId && tipo) {
        const apiCall = tipo === 'pelicula' ? this.api.trailers(this.movieId) : this.api.trailerSerie(this.movieId);
        apiCall.subscribe(response => {
          this.trailerKey = response.results;
          if (this.trailerKey.length > 0) {
            this.setVideoIframe();
          } else {
            // Asignar el mensaje cuando no hay vídeos disponibles
            this.mensajeNoVideo = 'Todavía no ha salido el tráiler para esta película o serie.';
          }
        });
      }
    });
  }
  

  private setVideoIframe(): void {
    const primerDato = this.trailerKey[0].key;
    // Construir la URL del video de YouTube
    const videoUrl = 'https://www.youtube.com/embed/' + primerDato;
    // Sanitizar la URL para evitar problemas de seguridad
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
}
