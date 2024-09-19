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
  cartItemCount: number = 0;

  constructor(private cartService: CartService, private modalCtrl: ModalController) { }

  ngOnInit() {
    // Inscreve-se para receber atualizações dos itens do carrinho
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });

    // Inscreve-se para atualizar a contagem de itens no carrinho
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  increaseQuantity(item: any) {
    this.cartService.updateQuantity(item, item.quantity + 1);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item, item.quantity - 1);
    }
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartService.calculateTotal();
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
}
