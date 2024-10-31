import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private statusStarted = false; // Controla se o status já foi iniciado

  // Método para definir os dados do pedido
  setOrderData(orderItems: any[], totalAmount: number, address: string, paymentMethod: string) {
    this.orderItems = orderItems;
    this.totalAmount = totalAmount;
    this.address = address;
    this.paymentMethod = paymentMethod;
  }

  // Retorna true se o pedido estiver em andamento e houver itens no pedido
  get isOrderInProgress(): boolean {
    return this.orderItems.length > 0 && this.orderStatusSubject.value !== 'Seu pedido chegou!';
  }

  // Inicia a atualização do status, mas evita reinicialização se já estiver em andamento
  startStatusUpdate() {
    if (this.statusStarted) {
      return; // Impede a reinicialização do status
    }
    this.statusStarted = true;

    let count = 0;
    this.statusInterval = setInterval(() => {
      count++;
      if (count === 1) {
        this.orderStatusSubject.next('Seu pedido está sendo preparado');
        this.orderStatusColorSubject.next('danger'); // Vermelho
      } else if (count === 2) {
        this.orderStatusSubject.next('Seu pedido está a caminho');
        this.orderStatusColorSubject.next('warning'); // Amarelo
      } else if (count === 3) {
        this.orderStatusSubject.next('Seu pedido chegou!');
        this.orderStatusColorSubject.next('success'); // Verde
        clearInterval(this.statusInterval); // Para o intervalo após o último estado
      }
    }, 30000); // Intervalo de 10 segundos
  }

  stopStatusUpdate() {
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
      this.statusStarted = false;
    }
  }
}
