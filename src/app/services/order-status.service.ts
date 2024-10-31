import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  private orderStatusSubject = new BehaviorSubject<string>('Seu pedido está sendo preparado');
  private orderStatusColorSubject = new BehaviorSubject<string>('danger');
  orderStatus$ = this.orderStatusSubject.asObservable();
  orderStatusColor$ = this.orderStatusColorSubject.asObservable();

  // Dados do pedido
  orderItems: any[] = [];
  totalAmount: number = 0;
  address: string = '';
  paymentMethod: string = '';
  private statusInterval: any;
  statusStarted = false;
  private statusCount = 0; // Rastreia o número de atualizações de status

  constructor(private cartService: CartService) {
    // Limpa o carrinho quando o status do pedido chega ao estado final
    this.orderStatus$.subscribe(status => {
      if (status === 'Seu pedido chegou!') {
        this.clearOrderData(); // Limpa os dados do pedido e o carrinho
      }
    });
  }

  setOrderData(orderItems: any[], totalAmount: number, address: string, paymentMethod: string) {
    this.orderItems = orderItems;
    this.totalAmount = totalAmount;
    this.address = address;
    this.paymentMethod = paymentMethod;
    this.statusStarted = false;
    this.statusCount = 0; // Reinicia o contador para um novo pedido
    this.startStatusUpdate();
  }

  get isOrderInProgress(): boolean {
    return this.orderItems.length > 0 && this.orderStatusSubject.value !== 'Seu pedido chegou!';
  }

  startStatusUpdate() {
    if (this.statusStarted) {
      return;
    }
    this.statusStarted = true;

    // Configura o intervalo com base no statusCount atual
    this.statusInterval = setInterval(() => {
      this.statusCount++;

      if (this.statusCount === 1) {
        this.orderStatusSubject.next('Seu pedido está sendo preparado');
        this.orderStatusColorSubject.next('danger'); // Vermelho
      } else if (this.statusCount === 2) {
        this.orderStatusSubject.next('Seu pedido está a caminho');
        this.orderStatusColorSubject.next('warning'); // Amarelo
      } else if (this.statusCount === 3) {
        this.orderStatusSubject.next('Seu pedido chegou!');
        this.orderStatusColorSubject.next('success'); // Verde
        clearInterval(this.statusInterval);
        this.statusStarted = false;
      }
    }, 10000); // Intervalo de 10 segundos
  }

  stopStatusUpdate() {
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
      this.statusStarted = false;
    }
  }

  clearOrderData() {
    this.orderItems = [];
    this.totalAmount = 0;
    this.address = '';
    this.paymentMethod = '';
    this.cartService.clearCart();
    this.stopStatusUpdate();
    this.statusCount = 0; // Reseta o contador para novos pedidos
  }
}
