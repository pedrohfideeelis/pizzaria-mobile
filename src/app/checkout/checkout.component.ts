import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AddressModalComponent } from '../address-modal/address-modal.component';
import { NavigationExtras, Router } from '@angular/router';
import { OrderStatusService } from '../services/order-status.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  address = "";
  paymentMethod: string = 'PIX';
  showAddressModal: boolean = false;
  newAddress = "";
  storedTotal = localStorage.getItem('cartTotal');
  totalAmount: number = this.storedTotal ? parseFloat(this.storedTotal) : 0;

  constructor(
    private cartService: CartService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private router: Router,
    private orderStatusService: OrderStatusService
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.address = user.address || 'Endereço não disponível';
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
      message: 'O tempo estimado para entrega é de 30 - 40 minutos. O pagamento será feito no momento da entrega',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            const navigationExtras: NavigationExtras = {
              state: {
                orderItems: this.cartItems,
                totalAmount: this.totalAmount,
                address: this.address,
                paymentMethod: this.paymentMethod
              }
            };
            this.orderStatusService.setOrderData(this.cartItems, this.totalAmount, this.address, this.paymentMethod);
            this.router.navigate(['order-tracking'], navigationExtras);
          }
        }
      ]
    });

    await alert.present();
  }
}

