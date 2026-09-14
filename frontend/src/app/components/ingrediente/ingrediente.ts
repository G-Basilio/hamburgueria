import { Component, OnInit } from '@angular/core';
import { Ingrediente } from '../../models/ingrediente.model';
import { IngredienteService } from '../../services/ingrediente';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.html',
  standalone: false
})
export class IngredienteComponent implements OnInit {
  ingredientes: Ingrediente[] = [];
  ingredienteAtual: Ingrediente = this.novoIngrediente();
  termoBusca: string = '';

  constructor(private ingredienteService: IngredienteService) {}

  ngOnInit(): void {
    this.listar();
  }

  novoIngrediente(): Ingrediente {
    return { descricao: '', precoUnitario: 0, adicional: false };
  }

  listar(): void {
    this.ingredienteService.listar(this.termoBusca).subscribe({
      next: (dados) => this.ingredientes = dados,
      error: (err) => console.error('Erro ao buscar ingredientes', err)
    });
  }

  salvar(): void {
    this.ingredienteService.salvar(this.ingredienteAtual).subscribe({
      next: () => {
        this.listar();
        this.ingredienteAtual = this.novoIngrediente();
      },
      error: (err) => console.error('Erro ao salvar ingrediente', err)
    });
  }

  editar(ingrediente: Ingrediente): void {
    this.ingredienteAtual = { ...ingrediente };
  }
}
