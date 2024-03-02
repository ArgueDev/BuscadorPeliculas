import { Component, OnInit, ViewChild } from '@angular/core';
import { BuscadorPeliculasService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Add NgbCarouselModule to the imports array
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'

})
export class HomeComponent {

 
}
