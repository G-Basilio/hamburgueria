import { Ingrediente } from './ingrediente.model';

export interface Hamburguer {
  id?: number;
  descricao: string;
  valor: number;
  ingredientes: Ingrediente[];
}
