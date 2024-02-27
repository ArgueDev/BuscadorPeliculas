import { Component, OnInit, ViewChild } from '@angular/core';
import { BuscadorPeliculasService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Add NgbCarouselModule to the imports array
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'

})
export class HomeComponent implements OnInit{

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

  stopAutoPlay() {
    // Detiene el autoplay cancelando la suscripción al temporizador
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  bannerData() {
    this.api.bannerApiData().subscribe((result) => {
      console.log(result, 'bannerresult#');
      this.bannnerApi = result.results;
    });
  }


nextImage() {
  this.currentIndex = (this.currentIndex + 1) % this.bannnerApi.length;
}

prevImage() {
  this.currentIndex = (this.currentIndex - 1 + this.bannnerApi.length) % this.bannnerApi.length;
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
