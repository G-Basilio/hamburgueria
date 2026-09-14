import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BebidaComponent } from './components/bebida/bebida';
import { IngredienteComponent } from './components/ingrediente/ingrediente';
import {HamburguerComponent} from './components/hamburguer/hamburguer';
import {PedidoComponent} from './components/pedido/pedido';

const routes: Routes = [
  { path: 'bebidas', component: BebidaComponent },
  { path: 'ingredientes', component: IngredienteComponent },
  { path: 'hamburgueres', component: HamburguerComponent },
  { path: 'pedidos', component: PedidoComponent },
  { path: '', redirectTo: '/bebidas', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
