import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cardapio } from './cardapio.page';

const routes: Routes = [
  {
    path: '',
    component: Cardapio,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardapioPageRoutingModule {}
