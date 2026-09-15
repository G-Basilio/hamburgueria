import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Hamburguer } from '../../models/hamburguer.model';
import { Ingrediente } from '../../models/ingrediente.model';
import { HamburguerService } from '../../services/hamburguer';
import { IngredienteService } from '../../services/ingrediente';
import Swal from 'sweetalert2';

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
  hamburgueresFiltrados: Hamburguer[] = [];

  constructor(
    private hamburguerService: HamburguerService,
    private ingredienteService: IngredienteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listar();
    this.carregarIngredientes();
  }

  novoHamburguer(): Hamburguer {
    return { descricao: '', valor: null as any, ingredientes: [] };
  }

  listar(): void {
    this.hamburguerService.listar().subscribe({
      next: (dados) => {
        this.hamburgueres = dados.sort((a, b) => a.descricao.localeCompare(b.descricao));
        this.filtrarLista();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao buscar hambúrgueres', err)
    });
  }

  filtrarLista(): void {
    if (!this.termoBusca) {
      this.hamburgueresFiltrados = [...this.hamburgueres];
    } else {
      const termo = this.removerAcentos(this.termoBusca.toLowerCase());
      this.hamburgueresFiltrados = this.hamburgueres.filter(h =>
        this.removerAcentos(h.descricao.toLowerCase()).includes(termo)
      );
    }
  }

  removerAcentos(texto: string): string {
    return texto ? texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
  }

  carregarIngredientes(): void {
    this.ingredienteService.listar().subscribe({
      next: (dados) => {
        this.ingredientesDisponiveis = dados;
        this.cdr.detectChanges();
      },
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
        Swal.fire({
          title: 'Sucesso!',
          text: 'Hambúrguer salvo com sucesso.',
          icon: 'success',
          confirmButtonColor: '#0d6efd'
        }).then(() => {
          this.termoBusca = '';
          this.hamburguerAtual = this.novoHamburguer();
          this.listar();
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Erro ao salvar hambúrguer', err);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível salvar o hambúrguer.',
          icon: 'error',
          confirmButtonColor: '#0d6efd'
        });
      }
    });
  }

  editar(hamburguer: Hamburguer): void {
    this.hamburguerAtual = JSON.parse(JSON.stringify(hamburguer));
  }
}
