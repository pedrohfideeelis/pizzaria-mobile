import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pizza-modal',
  templateUrl: './pizza-modal.component.html',
  styleUrls: ['./pizza-modal.component.scss'],
})
export class PizzaModalComponent {
  @Input() pizza: any;
  selectedSize: string = ' M';
  quantity: number = 1;
  notes: string = '';
  totalPrice: number = 0;

  constructor(private modalCtrl: ModalController){}

  ngOnInit(){
    this.updatePrice();
  }

  updatePrice(){
    const sizeMultiplier = this.selectedSize === 'M' ? 1 : this.selectedSize === 'P' ? 1.5 : 2;
    this.totalPrice = this.pizza.price * sizeMultiplier * this.quantity;
  }

  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  addToCart(){
    return this.modalCtrl.dismiss({
      pizza: this.pizza,
      size: this.selectedSize,
      quantity: this.quantity,
      notes: this.notes,
      totalPrice: this.totalPrice
    }, 'confirm');
  }

  changeQuantity(change: number){
    if(this.quantity + change > 0){
      this.quantity += change;
      this.updatePrice();
    }
  }
}
