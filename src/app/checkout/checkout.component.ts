import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { NavController, ModalController } from '@ionic/angular';
import { AddressModalComponent } from '../address-modal/address-modal.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  address: string | null = null;
  paymentMethod: string = 'PIX';
  showAddressModal: boolean = false;
  newAddress = "";

  constructor(
    private cartService: CartService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.address = user.address || 'Endereço não disponível'; //
  }

  goBack() {
    this.navCtrl.back();
  }

  async editAddress() {
    const modal = await this.modalCtrl.create({
      component: AddressModalComponent,
      componentProps: { address: this.address }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.address = data.data;
        const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
        user.address = this.address;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
      }
    });

    return await modal.present();
  }

  closeModal() {
    this.showAddressModal = false;
  }

  saveNewAddress() {
    this.address = this.newAddress;

    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    user.address = this.newAddress;
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    this.closeModal();
  }

  removeItem(item: any) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems(); // Atualiza os itens após a remoção
  }

  increaseQuantity(item: any) {
    this.cartService.updateQuantity(item, item.quantity + 1);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item, item.quantity - 1);
    }
  }

  getUserAddress(): string | null {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const userData = JSON.parse(user);
      return userData.address;
    }
    return null;
  }

  updateUserAddress(newAddress: string): void {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const userData = JSON.parse(user);
      userData.address = newAddress;
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
    }
  }

  placeOrder() {
    this.cartService.clearCart(); // Limpa o carrinho após realizar o pedido
    this.navCtrl.navigateRoot('/order-confirmation'); // Redireciona para a página de confirmação
  }
}
