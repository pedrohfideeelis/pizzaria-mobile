import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cardapio } from './cardapio.page';
import {PizzaCardModule} from "./pizza-card/pizza-card.module"

import { CardapioPageRoutingModule } from './cardapio-routing.module';
import { PizzaModalComponent } from './pizza-modal/pizza-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CardapioPageRoutingModule,
    PizzaCardModule
  ],
  declarations: [Cardapio, PizzaModalComponent],
  exports: [PizzaModalComponent]
})
export class CardapioPageModule {}
