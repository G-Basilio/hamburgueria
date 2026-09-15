import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingrediente } from '../models/ingrediente.model';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {
  private apiUrl = 'http://localhost:8080/ingredientes';

  constructor(private http: HttpClient) { }

  listar(descricao?: string): Observable<Ingrediente[]> {
    let params = new HttpParams();
    if (descricao && descricao.trim() !== '') {
      params = params.set('descricao', descricao);
    }
    return this.http.get<Ingrediente[]>(this.apiUrl, { params });
  }

  salvar(ingrediente: Ingrediente): Observable<Ingrediente> {
    if (ingrediente.id) {
      return this.http.put<Ingrediente>(`${this.apiUrl}/${ingrediente.id}`, ingrediente);
    }
    return this.http.post<Ingrediente>(this.apiUrl, ingrediente);
  }
}
