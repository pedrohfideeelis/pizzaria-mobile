import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PizzaModalComponent } from '../cardapio/pizza-modal/pizza-modal.component';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../services/pizza.model';

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class Home implements OnInit {
  pizzas: Pizza[] = [];
  firstName: string = '';

  constructor(private modalCtrl: ModalController, private pizzaService: PizzaService) { }

  ngOnInit() {
    this.pizzas = this.pizzaService.getPizzas(); // Correção aqui
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
}

