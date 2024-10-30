import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {
  orderItems: any[] = [];
  paymentMethod = '';
  totalAmount = 0;
  address = '';
  deliveryTime = '';
  orderStatus = 'preparado';

  constructor(private router: Router, private navCtrl: NavController) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      orderItems: any[];
      totalAmount: number;
      address: string;
      paymentMethod: string;
    };

    if (state) {
      this.orderItems = state.orderItems;
      this.totalAmount = state.totalAmount;
      this.address = state.address;
      this.paymentMethod = state.paymentMethod;
    }
  }

  ngOnInit() {
    this.calculateDeliveryTime();
  }

  goBack() {
    this.router.navigate(['/tabs/home']);
  }

  openHelp() {
    // Implementação da função para abrir a ajuda
  }

  calculateDeliveryTime() {
    const currentTime = new Date();

    // Cálculo para 30 minutos
    const deliveryStart = new Date(currentTime);
    deliveryStart.setMinutes(currentTime.getMinutes() + 30);

    // Cálculo para 40 minutos
    const deliveryEnd = new Date(currentTime);
    deliveryEnd.setMinutes(currentTime.getMinutes() + 40);

    // Formatar para exibir apenas as horas e minutos
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    const startFormatted = deliveryStart.toLocaleTimeString([], options);
    const endFormatted = deliveryEnd.toLocaleTimeString([], options);

    this.deliveryTime = `Hoje, ${startFormatted} - ${endFormatted}`;
  }
}
