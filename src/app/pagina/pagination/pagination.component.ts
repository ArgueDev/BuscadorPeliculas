import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BuscadorPeliculasService } from '../../Services/api.service';
import { Params } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }


  generatePageRange(): number[] {
    const range = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 4); // Mostrar hasta 5 números de página

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }
  changePage(pageNumber: number): void {
    this.pageChange.emit(pageNumber);
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
    this.currentPage++;
    } 
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
