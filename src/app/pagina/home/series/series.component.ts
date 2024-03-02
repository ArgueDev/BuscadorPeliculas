import { Component, OnInit } from '@angular/core';
import { BuscadorPeliculasService } from '../../../Services/api.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from "../../pagination/pagination.component";

@Component({
    selector: 'app-series',
    standalone: true,
    templateUrl: './series.component.html',
    styleUrl: './series.component.css',
    imports: [CommonModule, PaginationComponent]
})
export class SeriesComponent implements OnInit{
  
  totalPages: number = 1;
  series: any[] = [];
  currentPage: number = 1;

  constructor(private api: BuscadorPeliculasService) { }
  
  ngOnInit(): void {
    this.getSeries(this.currentPage);
  }
  getSeries(pageNumber: number): void {
    this.api.getSeries(pageNumber)
      .subscribe(
        (result: { results: any[], total_pages: number }) => { // Update the type of 'result' parameter
          console.log(result, '#Movies');
          this.series = result.results;
          this.totalPages = result.total_pages;
        },
        error => {
          console.error('Error fetching movies:', error);
        }
      );
  }

}
