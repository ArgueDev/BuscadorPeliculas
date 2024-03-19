import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BuscadorPeliculasService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buscador-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buscador-peliculas.component.html',
  styleUrl: './buscador-peliculas.component.css'
})
export class BuscadorPeliculasComponent implements OnInit{
  
  term: string = '';
  resultados: any[] = [];
  private routeSub: Subscription = new Subscription();

  constructor(api: BuscadorPeliculasService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.term = params['term'];
      // Utiliza this.term para buscar resultados relevantes y mostrarlos en la página
    });
  }

ngOnDestroy() {
  this.routeSub.unsubscribe();
}
buscarResultados(term: string) {
  // Aquí puedes implementar la lógica para buscar resultados utilizando el término de búsqueda
  // Llena la matriz 'resultados' con los resultados obtenidos
}
}
