import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bebida } from '../models/bebida.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BebidaService {
  private apiUrl = `${environment.apiUrl}/bebidas`;

  constructor(private http: HttpClient) { }

  listar(descricao?: string): Observable<Bebida[]> {
    let params = new HttpParams();
    if (descricao) {
      params = params.set('descricao', descricao);
    }
    return this.http.get<Bebida[]>(this.apiUrl, { params });
  }

  salvar(bebida: Bebida): Observable<Bebida> {
    if (bebida.id) {
      return this.http.put<Bebida>(`${this.apiUrl}/${bebida.id}`, bebida);
    }
    return this.http.post<Bebida>(this.apiUrl, bebida);
  }
}
