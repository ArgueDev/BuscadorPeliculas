import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorPeliculasService } from '../../../Services/api.service';
import { Params } from '@angular/router';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-pelicula.component.html',
  styleUrl: './home-pelicula.component.css'
})
export class HomePeliculaComponent implements OnInit {

  movies: any[] = [];
  totalPages: number = 1;
  currentPage: number = 1;
Math: any;



  constructor(private api: BuscadorPeliculasService) { }

  ngOnInit(): void{
    this.getMovies(this.currentPage);
  }

  getMovies(pageNumber: number): void {
    this.api.getMovies(pageNumber)
      .subscribe(
        (result: { results: any[], total_pages: number }) => { // Update the type of 'result' parameter
          console.log(result, 'Movies');
          this.movies = result.results;
          this.totalPages = result.total_pages;
        },
        error => {
          console.error('Error fetching movies:', error);
        }
      );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.getMovies(this.currentPage);
    } 
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMovies(this.currentPage);
    }
  }

  generatePageRange(): number[] {
    const range = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 4); // Mostrar hasta 5 números de página

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }
}
