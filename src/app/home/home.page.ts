import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PizzaModalComponent } from '../cardapio/pizza-modal/pizza-modal.component';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../models/pizza.model';
import { CartService } from '../services/cart.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class Home implements OnInit {
  pizzas: Pizza[] = [];
  firstName: string = '';
  cartItemCount: number = 0;

  constructor(private modalCtrl: ModalController, private pizzaService: PizzaService, private cartService: CartService) { }

  ngOnInit() {
    this.updateCartCount();
    this.pizzas = this.pizzaService.getPizzas();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (loggedInUser && loggedInUser.name) {
      this.firstName = loggedInUser.name.split(' ')[0];
    }
  }

  async openModal(pizza: any) {
    const modal = await this.modalCtrl.create({
      component: PizzaModalComponent,
      componentProps: { pizza },
    });
    modal.present();
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartComponent
    });

    modal.onDidDismiss().then(() => {
      this.updateCartCount();
    });

    return await modal.present();
  }

  updateCartCount() {
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }
}
