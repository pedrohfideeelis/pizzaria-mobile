import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AddressModalComponent } from '../address-modal/address-modal.component';
import { Router } from '@angular/router';

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
  totalAmount: number = 0;

  constructor(
    private cartService: CartService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.address = user.address || 'Endereço não disponível';
    this.calculateTotal();
  }

  goBack() {
    this.navCtrl.back();
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
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
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
    this.calculateTotal();

    if (this.cartItems.length === 0) {
      this.totalAmount = 0;

      this.modalCtrl.dismiss().catch(() => {
        this.router.navigate(['/tabs/home']);
      });
    }
  }

  increaseQuantity(item: any) {
    this.cartService.updateQuantity(item, item.quantity + 1);
    this.calculateTotal();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item, item.quantity - 1);
      this.calculateTotal();
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

  async placeOrder() {
    const alert = await this.alertController.create({
      header: 'Pedido Enviado!',
      message: 'SEU PEDIDO FOI ENVIADO! O tempo estimado para entrega é de 30 - 40 minutos.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
