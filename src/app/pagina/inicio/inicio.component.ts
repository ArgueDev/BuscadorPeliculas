import { Component, OnInit, ViewChild } from '@angular/core';
import { BuscadorPeliculasService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{

  bannnerApi: any = []; // Declare the 'bannnerApi' property
  timerSubscription: any;
  

  constructor(private api: BuscadorPeliculasService) { }
  currentIndex = 0;
  interval = 5000;

  ngOnInit() {
    this.bannerData();
    this.startAutoPlay();
  }   

  ngOnDestroy() {
    // Cancelar la suscripción al destruir el componente para evitar fugas de memoria
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  bannerData() {
    this.api.bannerApiData().subscribe((result) => {
      console.log(result, 'inicio#');
      this.bannnerApi = result.results;
    },
    error => {
      console.error('Error fetching movies:', error);
    }
    );
    
  }

nextImage() {
  if (this.bannnerApi.length > 0) {
    this.currentIndex = (this.currentIndex + 1) % this.bannnerApi.length;
  }
}

prevImage() {
  if (this.bannnerApi.length > 0) {
    this.currentIndex = (this.currentIndex - 1 + this.bannnerApi.length) % this.bannnerApi.length;
  }
}

truncatedOverview(overview: string, index: number): string {
  const maxLength = 100; // Longitud máxima del texto a mostrar inicialmente
  return this.bannnerApi[index].showFullOverview ? overview : (overview.length > maxLength ? overview.substring(0, maxLength) + '...' : overview);
}

toggleOverview(index: number) {
  this.bannnerApi[index].showFullOverview = !this.bannnerApi[index].showFullOverview;
}

isOverMaxLength(overview: string, index: number): boolean {
  const maxLength = 100; // Longitud máxima del texto a mostrar inicialmente
  return overview.length > maxLength && !this.bannnerApi[index].showFullOverview;
}

 startAutoPlay() {
    // Inicia el autoplay configurando un temporizador para llamar a nextImage() cada 'interval' milisegundos
    this.timerSubscription = timer(0, this.interval).subscribe(() => {
      this.nextImage();
    });
  }
}
