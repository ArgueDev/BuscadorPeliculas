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
    moviesChunks: any[] = [];

    movies: any[] = [];
  moviesGrid: any[] = [];
  itemsPerRow: number = 3; // Define el número de columnas
  totalPages: number = 1;
  currentPage: number = 1;




    constructor(private api: BuscadorPeliculasService) { }

    ngOnInit(): void{
      this.getMovies(this.currentPage); 
    }

    getMovies(pageNumber: number): void {
      this.api.getMovies(pageNumber)
        .subscribe(
          (result: { results: any[], total_pages: number }) => {
            this.movies = result.results;
            this.totalPages = result.total_pages;
            this.currentPage = pageNumber;
            this.moviesGrid = this.chunkArray(this.movies, this.itemsPerRow); // Divide las películas en filas y columnas
          },
          error => {
            console.error('Error fetching movies:', error);
          }
        );
    }

    chunkArray(array: any[], size: number): any[] {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
      }
      return chunkedArray;
    }

  }
