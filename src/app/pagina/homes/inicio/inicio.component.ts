import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BuscadorPeliculasService } from '../../../Services/api.service';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { Route, Router } from '@angular/router';

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
  generos: any [] = [];
  lisGenero: any;
  constructor(private api: BuscadorPeliculasService, private router: Router) { }
  currentIndex = 0;
  interval = 5000;
  isAtStart = true;
  isAtEnd = false;

  @ViewChild('container') container!: ElementRef;

  ngOnInit() {
    this.bannerData();
    this.startAutoPlay();
    this.getPopularPeliculas();
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

  getPopularPeliculas() {
    this.api.getPopular().subscribe((result) => {
        this.generos = result.results;
        console.log(this.generos, 'generos');
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

updateButtonStates() {
  const container = this.container.nativeElement;
  this.isAtStart = container.scrollLeft === 0;
  this.isAtEnd = container.scrollLeft + container.offsetWidth >= container.scrollWidth;
}
scrollLeft() {
  if (this.container) {
    this.container.nativeElement.scrollLeft -= 200; // Ajusta el valor según lo necesites
    this.updateButtonStates();

  }
}

ScrollRight() {
  if (this.container) {
    this.container.nativeElement.scrollLeft += 200; // Ajusta el valor según lo necesites
    this.updateButtonStates();

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

  detallePelicula(id: number) {
    this.router.navigate(['detallesPeliculas', id]);
  }
}
