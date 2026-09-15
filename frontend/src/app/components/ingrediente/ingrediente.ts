import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Ingrediente } from '../../models/ingrediente.model';
import { IngredienteService } from '../../services/ingrediente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.html',
  standalone: false
})
export class IngredienteComponent implements OnInit {
  ingredientes: Ingrediente[] = [];
  ingredienteAtual: Ingrediente = this.novoIngrediente();
  termoBusca: string = '';
  ingredientesFiltrados: Ingrediente[] = [];

  constructor(
    private ingredienteService: IngredienteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  novoIngrediente(): Ingrediente {
    return { descricao: '', precoUnitario: null as any, adicional: false };
  }

  listar(): void {
    this.ingredienteService.listar().subscribe({
      next: (dados) => {
        this.ingredientes = dados.sort((a, b) => a.descricao.localeCompare(b.descricao));
        this.filtrarLista();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao buscar ingredientes', err)
    });
  }

  filtrarLista(): void {
    if (!this.termoBusca) {
      this.ingredientesFiltrados = [...this.ingredientes];
    } else {
      const termo = this.removerAcentos(this.termoBusca.toLowerCase());
      this.ingredientesFiltrados = this.ingredientes.filter(i =>
        this.removerAcentos(i.descricao.toLowerCase()).includes(termo)
      );
    }
  }

  removerAcentos(texto: string): string {
    return texto ? texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
  }

  salvar(): void {
    this.ingredienteService.salvar(this.ingredienteAtual).subscribe({
      next: () => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Ingrediente salvo com sucesso.',
          icon: 'success',
          confirmButtonColor: '#0d6efd'
        }).then(() => {
          this.termoBusca = '';
          this.ingredienteAtual = this.novoIngrediente();
          this.listar();
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Erro ao salvar ingrediente', err);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível salvar o ingrediente.',
          icon: 'error',
          confirmButtonColor: '#0d6efd'
        });
      }
    });
  }

  editar(ingrediente: Ingrediente): void {
    this.ingredienteAtual = { ...ingrediente };
  }
}
