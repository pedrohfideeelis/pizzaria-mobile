import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PizzaCardComponent } from './pizza-card.component';

@NgModule({
  declarations: [PizzaCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [PizzaCardComponent]
})
export class PizzaCardModule { }
