import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cardapio } from './cardapio.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import {PizzaCardModule} from "./pizza-card/pizza-card.module"

import { CardapioPageRoutingModule } from './cardapio-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CardapioPageRoutingModule,
    PizzaCardModule
  ],
  declarations: [Cardapio]
})
export class CardapioPageModule {}
