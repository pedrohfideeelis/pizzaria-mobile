import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ModalController, AlertController } from '@ionic/angular';


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
  originalPrice: number = 0; // Para manter o preço original antes do desconto
  discountAmount: number = 0; // Para armazenar o valor do desconto aplicado
  isCouponApplied: boolean = false;

  constructor(private cartService: CartService, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

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
    const total = this.totalPrice = this.cartService.calculateTotal();
    this.originalPrice = total; // Salva o preço original antes de aplicar o desconto
    this.totalPrice = total - this.discountAmount; // Atualiza o total considerando o desconto
  }

  async applyCoupon() {
    if (this.couponCode) {
      const result = this.cartService.validateCoupon(this.couponCode);
      if (result === 'invalid') {
        await this.showAlert('Cupom inválido', 'Por favor, verifique o código do cupom.');
      } else if (result === 'used') {
        await this.showAlert('Cupom já utilizado', 'Este cupom já foi utilizado.');
      } else {
        this.originalPrice = this.totalPrice; // Salva o preço original antes de aplicar o desconto
        this.totalPrice = result; // Atualiza o totalPrice com o desconto aplicado
        this.isCouponApplied = true; // Desativa o botão após aplicar o cupom
      }
    }
  }

  async confirmPurchase() {
    if (this.couponCode) {
      this.cartService.markCouponAsUsed(this.couponCode); // Marcar como utilizado
      await this.showAlert('Compra Confirmada', 'Sua compra foi realizada com sucesso!');

      // Limpa o campo do cupom e o estado do botão
      this.clearCoupon();
      this.cartService.resetCoupon(this.couponCode); // Reseta o estado do cupom
    }
  }

  private clearCoupon() {
    this.couponCode = '';
    this.isCouponApplied = false; // Reativa o botão para aplicar cupom
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          if (header === 'Compra Confirmada') {
            this.clearCart(); // Limpa o carrinho
            this.closeCart(); // Fecha o modal
          }
        }
      }]
    });
    await alert.present();
  }

  closeCart() {
    this.modalCtrl.dismiss();
  }

  clearCart() {
    this.cartService.clearCart();
    this.discountAmount = 0; // Reseta o desconto ao limpar o carrinho
    this.totalPrice = 0; // Reseta o total ao limpar o carrinho
    this.originalPrice = 0; // Reseta o preço original ao limpar o carrinho
    this.couponCode = '';
  }
}
