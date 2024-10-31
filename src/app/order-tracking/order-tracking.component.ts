import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OrderStatusService } from '../services/order-status.service';

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
  orderStatus = 'Seu pedido está sendo preparado';
  orderStatusColor = 'danger';
  statusInterval: any;

  constructor(private router: Router, private navCtrl: NavController, private orderStatusService: OrderStatusService) {
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
    this.orderItems = this.orderStatusService.orderItems;
    this.totalAmount = this.orderStatusService.totalAmount;
    this.address = this.orderStatusService.address;
    this.paymentMethod = this.orderStatusService.paymentMethod;

    this.orderStatusService.startStatusUpdate();
    this.orderStatusService.orderStatus$.subscribe(status => this.orderStatus = status);
    this.orderStatusService.orderStatusColor$.subscribe(color => this.orderStatusColor = color);

    this.calculateDeliveryTime();
  }

  ngOnDestroy() {
    this.orderStatusService.stopStatusUpdate();
  }

  goBack() {
    this.router.navigate(['/tabs/home']);
  }

  openHelp() {
    // Implementação da função para abrir a ajuda
  }

  calculateDeliveryTime() {
    const currentTime = new Date();
    const deliveryStart = new Date(currentTime);
    deliveryStart.setMinutes(currentTime.getMinutes() + 30);
    const deliveryEnd = new Date(currentTime);
    deliveryEnd.setMinutes(currentTime.getMinutes() + 40);

    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    this.deliveryTime = `Hoje, ${deliveryStart.toLocaleTimeString([], options)} - ${deliveryEnd.toLocaleTimeString([], options)}`;
  }
}
