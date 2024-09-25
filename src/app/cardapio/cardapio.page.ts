import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PizzaModalComponent } from './pizza-modal/pizza-modal.component';
import { Pizza } from '../../models/pizza.model';
import { PizzaService } from '../services/pizza.service';
import { CartService } from '../services/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'cardapio',
  templateUrl: 'cardapio.page.html',
  styleUrls: ['cardapio.page.scss'],
})
export class Cardapio implements OnInit {
  cartItemCount: number = 0;
  pizzas: Pizza[] = [];

  constructor(private modalCtrl: ModalController, private pizzaService: PizzaService, private cartService: CartService, private modalCrtl: ModalController) {
    this.pizzas = this.pizzaService.getPizzas();
  }

  ngOnInit() {
    // Atualize o número de itens no carrinho quando a página for carregada
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  async openModal(pizza: any) {
    const modal = await this.modalCtrl.create({
      component: PizzaModalComponent,
      componentProps: { pizza }
    });
    modal.present();
  }

  async openCart() {
    const modal = await this.modalCrtl.create({
      component: CartComponent,
    });
    return await modal.present();
  }
}
