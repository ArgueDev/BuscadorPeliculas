import { Component, OnInit } from '@angular/core';
import { BuscadorPeliculasService } from '../../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent implements OnInit {

  detalle: any;
  detallesPeli: string = '';
  id: number | undefined;
  constructor(private api: BuscadorPeliculasService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.Detalles();
  }

  private Detalles(): void {
    this.router.params.subscribe(params => {
      const id = +params['id']; // Convertir el ID a número
      const tipo = this.router.snapshot.data['tipo']; // Obtener el tipo de contenido de los datos de la ruta
      if(id && tipo){
        const apiDetalles = (tipo === 'pelicula') ? this.api.getDetallesPelicula(id) : this.api.getDetallesSerie(id);
        apiDetalles.subscribe(
          (result: any[]) => {
            this.detalle = result;
           console.log(this.detalle);
          });
      }
    });
  }

  portadaPelicula(): string {
    return `https://image.tmdb.org/t/p/original${this.detalle.poster_path}`;
  }





}
