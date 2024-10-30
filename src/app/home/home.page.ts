import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PizzaModalComponent } from '../cardapio/pizza-modal/pizza-modal.component';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../../models/pizza.model';
import { CartService } from '../services/cart.service';
import { CartComponent } from '../cart/cart.component';
import { OrderStatusService } from '../services/order-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class Home implements OnInit {
  pizzas: Pizza[] = [];
  preferidas: Pizza[] = [];
  sushiPizzas: Pizza[] = [];
  popularesPizzas: Pizza[] = [];
  firstName: string = '';
  cartItemCount: number = 0;
  slideIndex: number = 0;
  orderInProgress = false;

  private preferidasID: number[] = [6, 5, 8, 1];
  private sushiID: number[] = [1, 4, 6];
  private popularesID: number[] = [8, 7, 5, 2];

  constructor(
    private modalCtrl: ModalController,
    private pizzaService: PizzaService,
    private cartService: CartService,
    private orderStatusService: OrderStatusService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updateCartCount();
    this.preferidas = this.pizzaService.getPizzasByIds(this.preferidasID);
    this.sushiPizzas = this.pizzaService.getPizzasByIds(this.sushiID);
    this.popularesPizzas = this.pizzaService.getPizzasByIds(this.popularesID);

    this.pizzas = this.pizzaService.getPizzas();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (loggedInUser && loggedInUser.name) {
      this.firstName = loggedInUser.name.split(' ')[0];
    }

    this.orderStatusService.orderStatus$.subscribe(status => {
      this.orderInProgress = status !== 'Seu pedido chegou!';
    });
  }

  ngAfterViewInit() {
    this.startSlider();
  }

  startSlider() {
    setInterval(() => {
      this.slideIndex++;
      const slides = document.querySelector('.slides') as HTMLElement;
      const totalSlides = slides.childElementCount;

      if (this.slideIndex >= totalSlides) {
        this.slideIndex = 0;
      }

      slides.style.transform = `translateX(-${this.slideIndex * 100}%)`;
    }, 3000);
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

  goToOrderTracking() {
    this.router.navigate(['/order-tracking']);
  }
}
