import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  url = "http://localhost:8080/pessoas";

  constructor(private http : HttpClient) { }

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.url);
  }

  getPessoa(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.url}/${id}`);
  }

  save(pessoa: Pessoa): Observable<Pessoa>{
    return this.http.post<Pessoa>(this.url, pessoa);
  }

  update(pessoa: Pessoa): Observable<Pessoa>{
    return this.http.put<Pessoa>(`${this.url}/${pessoa.id}`, pessoa);
  } 

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
