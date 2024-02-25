import { Component, OnInit } from '@angular/core';
import { BuscadorPeliculasService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  bannnerApi: any = []; // Declare the 'bannnerApi' property

  constructor(private api: BuscadorPeliculasService) { }

  ngOnInit() {
    this.bannerData();
  }      

  bannerData() {
    this.api.bannerApiData().subscribe((result) => {
      console.log(result, 'bannerresult#');
      this.bannnerApi = result.results;
    });
  }
}
