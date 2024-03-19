import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscadorPeliculasService {

  constructor(private http: HttpClient) { }
 
bannerApiData(): Observable<any> {
    return this.http.get(`${environment.url}/trending/all/week?api_key=${environment.apiKey}`);
  }

  getMovies(number: number): Observable<any> {
    const url = `${environment.url}/discover/movie?api_key=${environment.apiKey}&page=${number}`;
    return this.http.get<any>(url);
  }

  getSeries(number: number): Observable<any> {
    const url = `${environment.url}/discover/tv?api_key=${environment.apiKey}&page=${number}`;
    return this.http.get<any>(url);
  }

  tendencias(): Observable<any> {
    const url = `${environment.url}/trending/all/day?api_key=${environment.apiKey}`;
    return this.http.get<any>(url);
  }
  trailers(id: number): Observable<any> {
    const url = `${environment.url}/movie/${id}/videos?api_key=${environment.apiKey}`;
    return this.http.get<any>(url);
  }
  trailerSerie(id: number): Observable<any> {
    const url = `${environment.url}/tv/${id}/videos?api_key=${environment.apiKey}`;
    return this.http.get<any>(url);
  }

  getDetallesPelicula(id: number): Observable<any> {
    const url = `${environment.url}/movie/${id}?api_key=${environment.apiKey}`;
    return this.http.get<any>(url);
  }

  getDetallesSerie(id: number): Observable<any> {
    const url = `${environment.url}/tv/${id}?api_key=${environment.apiKey}`;
    return this.http.get<any>(url);
  }

  getPopular(): Observable<any> {
    return this.http.get(`${environment.url}/movie/upcoming?api_key=${environment.apiKey}`);
  }

  getBusquedaPelicula(busqueda: string): Observable<any> {
    const url = `${environment.url}/search/movie?api_key=${environment.apiKey}&query=${busqueda}`;
    return this.http.get<any>(url);
  }

  buscarSugerencias(busqueda: string): Observable<{ title: string, imageUrl: string }[]> {
    const url = `${environment.url}/search/movie?api_key=${environment.apiKey}&query=${busqueda}`;
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        const movies = response.results || [];
        return movies.map((movie: any) => ({ // Explicitly define the type of 'movie' parameter as 'any'
          title: movie.title,
          imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '' // Construye la URL completa de la imagen si hay una disponible
        }));
      })
    );
  }

}