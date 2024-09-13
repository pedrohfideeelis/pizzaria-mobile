import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  couponCode: string = '';
  totalPrice: number = 0;

  constructor(private cartService: CartService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);
      this.calculateTotalPrice();
    } else {
      this.cartItems = [];
    }
  }

  increaseQuantity(item: any) {
    item.quantity += 1;
    item.totalPrice = item.quantity * item.pizza.price;
    this.updateCartStorage();
    this.calculateTotalPrice();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      item.totalPrice = item.quantity * item.pizza.price;
      this.updateCartStorage();
      this.calculateTotalPrice();
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.updateCartStorage();
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
  }

  applyCoupon() {
    if (this.couponCode === 'DESCONTO10') {
      this.totalPrice *= 0.9;
    }
  }

  confirmPurchase() {
    console.log('Compra confirmada!');
  }

  closeCart() {
    this.modalCtrl.dismiss();
  }

  updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
