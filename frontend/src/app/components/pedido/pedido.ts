import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Pedido } from '../../models/pedido.model';
import { Hamburguer } from '../../models/hamburguer.model';
import { Bebida } from '../../models/bebida.model';
import { Ingrediente } from '../../models/ingrediente.model';
import { PedidoService } from '../../services/pedido';
import { HamburguerService } from '../../services/hamburguer';
import { BebidaService } from '../../services/bebida';
import { IngredienteService } from '../../services/ingrediente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.html',
  standalone: false
})
export class PedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  hamburgueresDisponiveis: Hamburguer[] = [];
  bebidasDisponiveis: Bebida[] = [];
  adicionaisDisponiveis: Ingrediente[] = [];

  pedidoAtual: Pedido = this.novoPedido();

  constructor(
    private pedidoService: PedidoService,
    private hamburguerService: HamburguerService,
    private bebidaService: BebidaService,
    private ingredienteService: IngredienteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listarPedidos();
    this.carregarOpcoes();
  }

  novoPedido(): Pedido {
    return {
      nomeCliente: '', enderecoCliente: '', telefoneCliente: '',
      descricaoPedido: '', observacoes: '',
      hamburgueres: [], bebidas: [], adicionais: []
    };
  }

  listarPedidos(): void {
    this.pedidoService.listar().subscribe({
      next: (dados) => {
        this.pedidos = dados.sort((a, b) => (b.id || 0) - (a.id || 0));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao buscar pedidos', err)
    });
  }

  carregarOpcoes(): void {
    this.hamburguerService.listar().subscribe(dados => {
      this.hamburgueresDisponiveis = dados.sort((a, b) => a.descricao.localeCompare(b.descricao));
      this.cdr.detectChanges();
    });

    this.bebidaService.listar().subscribe(dados => {
      this.bebidasDisponiveis = dados.sort((a, b) => a.descricao.localeCompare(b.descricao));
      this.cdr.detectChanges();
    });

    this.ingredienteService.listar().subscribe(dados => {
      this.adicionaisDisponiveis = dados
        .filter(i => i.adicional === true)
        .sort((a, b) => a.descricao.localeCompare(b.descricao));
      this.cdr.detectChanges();
    });
  }

  toggleItem(lista: any[], item: any, event: any): void {
    if (event.target.checked) {
      lista.push(item);
    } else {
      const index = lista.findIndex(i => i.id === item.id);
      if (index > -1) lista.splice(index, 1);
    }
  }

  possuiItem(lista: any[], id?: number): boolean {
    return lista.some(i => i.id === id);
  }

  salvar(): void {
    this.pedidoService.salvar(this.pedidoAtual).subscribe({
      next: () => {
        this.listarPedidos();
        this.pedidoAtual = this.novoPedido();
        Swal.fire({
          title: 'Sucesso!',
          text: 'Pedido finalizado com sucesso.',
          icon: 'success',
          confirmButtonColor: '#198754'
        });
      },
      error: (err) => {
        console.error('Erro ao salvar pedido', err);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível finalizar o pedido.',
          icon: 'error',
          confirmButtonColor: '#0d6efd'
        });
      }
    });
  }
}
