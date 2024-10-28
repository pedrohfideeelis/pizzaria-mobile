import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { NavController, ModalController } from '@ionic/angular';

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
  newAddress: string = '';

  constructor(
    private cartService: CartService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.address = this.getUserAddress(); // Obtém o endereço do usuário do LocalStorage
  }

  goBack() {
    this.navCtrl.back();
  }

  editAddress() {
    this.showAddressModal = true;
  }

  closeModal() {
    this.showAddressModal = false;
  }

  saveNewAddress() {
    this.address = this.newAddress; // Atualiza a propriedade address do componente
    this.updateUserAddress(this.newAddress); // Atualiza o endereço no LocalStorage
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

  // placeOrder() {
  //   // Lógica para confirmar pedido
  //   console.log("Pedido realizado com pagamento via", this.paymentMethod);
  //   this.cartService.clearCart(); // Limpa o carrinho após realizar o pedido
  //   this.navCtrl.navigateRoot('/order-confirmation'); // Redireciona para a página de confirmação
  // }
}
