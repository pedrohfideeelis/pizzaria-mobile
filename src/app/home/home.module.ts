import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Home } from './home.page';
import { PizzaCardModule } from '../cardapio/pizza-card/pizza-card.module';

import { HomePageRoutingModule } from './home-routing.module';
import { CardapioPageModule } from '../cardapio/cardapio.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    PizzaCardModule,
    CardapioPageModule,
  ],
  declarations: [Home]
})
export class HomePageModule {}
