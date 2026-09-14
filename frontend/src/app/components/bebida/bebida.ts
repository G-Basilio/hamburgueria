import { Component, OnInit } from '@angular/core';
import { Bebida } from '../../models/bebida.model';
import { BebidaService } from '../../services/bebida';

@Component({
  selector: 'app-bebida',
  templateUrl: './bebida.html',
  standalone: false
})
export class BebidaComponent implements OnInit {
  bebidas: Bebida[] = [];
  bebidaAtual: Bebida = this.novaBebida();
  termoBusca: string = '';

  constructor(private bebidaService: BebidaService) {}

  ngOnInit(): void {
    this.listar();
  }

  novaBebida(): Bebida {
    return { descricao: '', precoUnitario: 0, contemAcucar: false };
  }

  listar(): void {
    this.bebidaService.listar(this.termoBusca).subscribe({
      next: (dados) => this.bebidas = dados,
      error: (err) => console.error('Erro ao buscar bebidas', err)
    });
  }

  salvar(): void {
    this.bebidaService.salvar(this.bebidaAtual).subscribe({
      next: () => {
        this.listar();
        this.bebidaAtual = this.novaBebida();
      },
      error: (err) => console.error('Erro ao salvar bebida', err)
    });
  }

  editar(bebida: Bebida): void {
    this.bebidaAtual = { ...bebida };
  }
}
