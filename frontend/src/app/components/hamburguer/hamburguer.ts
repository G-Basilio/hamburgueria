import { Component, OnInit } from '@angular/core';
import { Hamburguer } from '../../models/hamburguer.model';
import { Ingrediente } from '../../models/ingrediente.model';
import { HamburguerService } from '../../services/hamburguer';
import { IngredienteService } from '../../services/ingrediente';

@Component({
  selector: 'app-hamburguer',
  templateUrl: './hamburguer.html',
  standalone: false
})
export class HamburguerComponent implements OnInit {
  hamburgueres: Hamburguer[] = [];
  ingredientesDisponiveis: Ingrediente[] = [];
  hamburguerAtual: Hamburguer = this.novoHamburguer();
  termoBusca: string = '';

  constructor(
    private hamburguerService: HamburguerService,
    private ingredienteService: IngredienteService
  ) {}

  ngOnInit(): void {
    this.listar();
    this.carregarIngredientes();
  }

  novoHamburguer(): Hamburguer {
    return { descricao: '', valor: 0, ingredientes: [] };
  }

  listar(): void {
    this.hamburguerService.listar(this.termoBusca).subscribe({
      next: (dados) => this.hamburgueres = dados,
      error: (err) => console.error('Erro ao buscar hambúrgueres', err)
    });
  }

  carregarIngredientes(): void {
    this.ingredienteService.listar().subscribe({
      next: (dados) => this.ingredientesDisponiveis = dados,
      error: (err) => console.error('Erro ao buscar ingredientes', err)
    });
  }

  toggleIngrediente(ingrediente: Ingrediente, event: any): void {
    if (event.target.checked) {
      this.hamburguerAtual.ingredientes.push(ingrediente);
    } else {
      this.hamburguerAtual.ingredientes = this.hamburguerAtual.ingredientes.filter(i => i.id !== ingrediente.id);
    }
  }

  possuiIngrediente(id?: number): boolean {
    return this.hamburguerAtual.ingredientes.some(i => i.id === id);
  }

  salvar(): void {
    this.hamburguerService.salvar(this.hamburguerAtual).subscribe({
      next: () => {
        this.listar();
        this.hamburguerAtual = this.novoHamburguer();
      },
      error: (err) => console.error('Erro ao salvar hambúrguer', err)
    });
  }

  editar(hamburguer: Hamburguer): void {
    this.hamburguerAtual = JSON.parse(JSON.stringify(hamburguer));
  }
}
