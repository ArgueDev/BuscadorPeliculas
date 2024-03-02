import { Component, OnInit } from '@angular/core';
import { BuscadorPeliculasService } from '../Services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-pelicula.component.html',
  styleUrl: './inicio-pelicula.component.css'
})
export class InicioPeliculaComponent implements OnInit{
  tendencias: any[] = [];

  constructor(private api: BuscadorPeliculasService ) { }
  
  ngOnInit(): void {
    this.bannerData();
  }
  
  bannerData() {
    this.api.tendencias().subscribe((result) => {
      console.log(result, 'tendencia#');
      this.tendencias = result.results;
    },
    error => {
      console.error('Error fetching movies:', error);
    }
    );
    
  }
}
