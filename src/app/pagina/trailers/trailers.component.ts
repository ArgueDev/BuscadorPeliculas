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

  constructor(private api: BuscadorPeliculasService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
    this.getTrailer();
  }


  private getTrailer(): void {
    this.route.params.subscribe(params => {
      this.movieId = +params['id']; // Convertimos el ID a número
      if (this.movieId) {
        this.api.trailers(this.movieId).subscribe(response => {
          // Assuming response.results is an array and you want the first trailer
          this.trailerKey = response.results;
          if (this.trailerKey.length > 0) {
            this.setVideoIframe();
          }        
        });
      }
    });
  }

  private setVideoIframe(): void {
    const primerDato = this.trailerKey[0].key;
    const videoUrl = 'https://www.youtube.com/embed/' + primerDato;
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
}
