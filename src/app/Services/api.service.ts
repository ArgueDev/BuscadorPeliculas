import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${environment.apiKey}&page=${number}`;
    return this.http.get<any>(url);
  }
}