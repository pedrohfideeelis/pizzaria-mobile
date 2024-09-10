import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PizzaModalComponent } from './pizza-modal/pizza-modal.component';
import { Pizza } from '../services/pizza.model';
import { PizzaService } from '../services/pizza.service';

@Component({
  selector: 'cardapio',
  templateUrl: 'cardapio.page.html',
  styleUrls: ['cardapio.page.scss'],
})
export class Cardapio {
  pizzas: Pizza[] = [];

  constructor(private modalCtrl: ModalController, private pizzaService: PizzaService) {
    this.pizzas = this.pizzaService.getPizzas();
  }

  async openModal(pizza: any) {
    const modal = await this.modalCtrl.create({
      component: PizzaModalComponent,
      componentProps: { pizza }
    });
    modal.present();
  }
}
