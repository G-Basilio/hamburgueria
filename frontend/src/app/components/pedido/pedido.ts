import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../models/pedido.model';
import { Hamburguer } from '../../models/hamburguer.model';
import { Bebida } from '../../models/bebida.model';
import { Ingrediente } from '../../models/ingrediente.model';
import { PedidoService } from '../../services/pedido';
import { HamburguerService } from '../../services/hamburguer';
import { BebidaService } from '../../services/bebida';
import { IngredienteService } from '../../services/ingrediente';

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
    private ingredienteService: IngredienteService
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
      next: (dados) => this.pedidos = dados,
      error: (err) => console.error('Erro ao buscar pedidos', err)
    });
  }

  carregarOpcoes(): void {
    this.hamburguerService.listar().subscribe(dados => this.hamburgueresDisponiveis = dados);
    this.bebidaService.listar().subscribe(dados => this.bebidasDisponiveis = dados);
    this.ingredienteService.listar().subscribe(dados => {
      this.adicionaisDisponiveis = dados.filter(i => i.adicional === true);
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
      },
      error: (err) => console.error('Erro ao salvar pedido', err)
    });
  }
}
