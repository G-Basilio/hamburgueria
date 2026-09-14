import { Hamburguer } from './hamburguer.model';
import { Bebida } from './bebida.model';
import { Ingrediente } from './ingrediente.model';

export interface Pedido {
  id?: number;
  dataPedido?: string;
  descricaoPedido: string;
  nomeCliente: string;
  enderecoCliente: string;
  telefoneCliente: string;
  observacoes: string;
  valorTotal?: number;
  hamburgueres: Hamburguer[];
  bebidas: Bebida[];
  adicionais: Ingrediente[];
}
