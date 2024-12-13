import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../pessoa';
import { PessoasService } from '../../services/pessoas.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pessoas-table',
  templateUrl: './pessoas-table.component.html',
  styleUrl: './pessoas-table.component.css'
})
export class PessoasTableComponent implements OnInit{
  pessoas: Pessoa[] = [];

  constructor(
    private service: PessoasService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loadPessoas();
    console.log(this.pessoas)
  }

  loadPessoas() {
    this.service.getPessoas().subscribe({
      next: (data) => (this.pessoas = data),
    });
  }

  selectPessoa(pessoaId: number) {
    this.cookieService.set('pessoaId', pessoaId.toString());
  }
}
