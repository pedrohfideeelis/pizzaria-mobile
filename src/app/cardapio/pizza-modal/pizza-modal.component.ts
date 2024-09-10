import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pizza-modal',
  templateUrl: './pizza-modal.component.html',
  styleUrls: ['./pizza-modal.component.scss'],
})
export class PizzaModalComponent {
  @Input() pizza: any;
  selectedSize: string = 'M';
  quantity: number = 1;
  notes: string = '';
  price: number = 0;
  totalPrice: number = this.price;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.pizza) {
      this.price = this.pizza.price;
    }
    this.updatePrice();
  }

  selectSize(size: string) {
    this.selectedSize = size;
    this.updatePrice();
  }

  updatePrice() {
    switch (this.selectedSize) {
      case 'P':
        this.totalPrice = this.price * this.quantity;
        break;
      case 'M':
        this.totalPrice = (this.price + 15) * this.quantity;
        break;
      case 'G':
        this.totalPrice = (this.price + 20) * this.quantity;
        break;
      default:
        this.totalPrice = this.price * this.quantity;
    }
  }


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  addToCart() {
    return this.modalCtrl.dismiss(
      {
        pizza: this.pizza,
        size: this.selectedSize,
        quantity: this.quantity,
        notes: this.notes,
        totalPrice: this.totalPrice,
      },
      'confirm'
    );
  }

  changeQuantity(change: number) {
    if (this.quantity + change > 0) {
      this.quantity += change;
      this.updatePrice();
    }
  }
}
