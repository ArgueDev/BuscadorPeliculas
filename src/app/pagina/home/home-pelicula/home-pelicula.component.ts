import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorPeliculasService } from '../../../Services/api.service';
import { Params } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginationComponent } from "../../pagination/pagination.component";

@Component({
    selector: 'app-home-pelicula',
    standalone: true,
    templateUrl: './home-pelicula.component.html',
    styleUrl: './home-pelicula.component.css',
    imports: [CommonModule, PaginationComponent]
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
          console.log(result, 'Movies#');
          this.movies = result.results;
          this.totalPages = result.total_pages;
        },
        error => {
          console.error('Error fetching movies:', error);
        }
      );
  }
}
