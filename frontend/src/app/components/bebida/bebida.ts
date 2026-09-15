import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Bebida } from '../../models/bebida.model';
import { BebidaService } from '../../services/bebida';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bebida',
  templateUrl: './bebida.html',
  standalone: false
})
export class BebidaComponent implements OnInit {
  bebidas: Bebida[] = [];
  bebidasFiltradas: Bebida[] = [];
  bebidaAtual: Bebida = this.novaBebida();
  termoBusca: string = '';

  constructor(
    private bebidaService: BebidaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  novaBebida(): Bebida {
    return { descricao: '', precoUnitario: null as any, contemAcucar: false };
  }

  listar(): void {
    this.bebidaService.listar().subscribe({
      next: (dados) => {
        this.bebidas = dados.sort((a, b) => a.descricao.localeCompare(b.descricao));
        this.filtrarLista(); // Atualiza a tela
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao buscar bebidas', err)
    });
  }

  filtrarLista(): void {
    if (!this.termoBusca) {
      this.bebidasFiltradas = [...this.bebidas];
    } else {
      const termo = this.removerAcentos(this.termoBusca.toLowerCase());
      this.bebidasFiltradas = this.bebidas.filter(b =>
        this.removerAcentos(b.descricao.toLowerCase()).includes(termo)
      );
    }
  }

  removerAcentos(texto: string): string {
    return texto ? texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
  }

  salvar(): void {
    this.bebidaService.salvar(this.bebidaAtual).subscribe({
      next: () => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Bebida salva com sucesso.',
          icon: 'success',
          confirmButtonColor: '#0d6efd'
        }).then(() => {
          this.termoBusca = '';
          this.bebidaAtual = this.novaBebida();
          this.listar();
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Erro ao salvar bebida', err);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível salvar a bebida.',
          icon: 'error',
          confirmButtonColor: '#0d6efd'
        });
      }
    });
  }

  editar(bebida: Bebida): void {
    this.bebidaAtual = { ...bebida };
  }
}
