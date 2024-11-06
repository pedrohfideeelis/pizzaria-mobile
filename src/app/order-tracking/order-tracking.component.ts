import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStatusService } from '../services/order-status.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {
  orderItems: any[] = [];
  storedTotal = localStorage.getItem('cartTotal');
  totalAmount: number = this.storedTotal ? parseFloat(this.storedTotal) : 0;
  address = '';
  paymentMethod = '';
  deliveryTime = '';
  orderStatus = '';
  orderStatusColor = '';

  constructor(private router: Router, private orderStatusService: OrderStatusService) { }

  ngOnInit() {
    // Obtenha os dados do pedido do serviço
    this.orderItems = this.orderStatusService.orderItems;
    this.totalAmount = this.orderStatusService.totalAmount;
    this.address = this.orderStatusService.address;
    this.paymentMethod = this.orderStatusService.paymentMethod;

    // Inicia a atualização do status somente uma vez
    if (!this.orderStatusService.statusStarted) {
      this.orderStatusService.startStatusUpdate();
    }

    // Subscreve ao status e à cor do status
    this.orderStatusService.orderStatus$.subscribe(status => this.orderStatus = status);
    this.orderStatusService.orderStatusColor$.subscribe(color => this.orderStatusColor = color);

    // Calcula a previsão de entrega
    this.calculateDeliveryTime();
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

  goBack() {
    this.router.navigate(['/tabs/home']);
  }
}
