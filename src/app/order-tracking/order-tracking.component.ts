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
  deliveryTime = 'Hoje, 20:30 - 21:20';
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

  ngOnInit() { }

  goBack() {
    this.navCtrl.back();
  }

  openHelp() {
    // Implementação da função para abrir a ajuda
  }
}
