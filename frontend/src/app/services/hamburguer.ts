import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hamburguer } from '../models/hamburguer.model';

@Injectable({
  providedIn: 'root'
})
export class HamburguerService {
  private apiUrl = 'http://localhost:8080/hamburgueres';

  constructor(private http: HttpClient) { }

  listar(descricao?: string): Observable<Hamburguer[]> {
    let params = new HttpParams();
    if (descricao && descricao.trim() !== '') {
      params = params.set('descricao', descricao);
    }
    return this.http.get<Hamburguer[]>(this.apiUrl, { params });
  }

  salvar(hamburguer: Hamburguer): Observable<Hamburguer> {
    if (hamburguer.id) {
      return this.http.put<Hamburguer>(`${this.apiUrl}/${hamburguer.id}`, hamburguer);
    }
    return this.http.post<Hamburguer>(this.apiUrl, hamburguer);
  }
}
