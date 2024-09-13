import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cartItems';

  constructor() { }

  getCartItems() {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  private saveCartItems(items: any) {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }

  addToCart(item: any) {
    const items = this.getCartItems();
    const index = items.findIndex((i: any) => i.pizza.id === item.pizza.id && i.size === item.size);

    if (index > -1) {
      items[index].quantity += item.quantity;
    } else {
      items.push(item);
    }

    this.saveCartItems(items);
  }

  updateQuantity(item: any, quantity: number) {
    const items = this.getCartItems();
    const index = items.findIndex((i: any) => i.pizza.id === item.pizza.id && i.size === item.size);

    if (index > -1) {
      if (quantity <= 0) {
        items.splice(index, 1);
      } else {
        items[index].quantity = quantity;
      }
      this.saveCartItems(items);
    }
  }

  removeFromCart(item: any) {
    let items = this.getCartItems();
    items = items.filter((i: any) => !(i.pizza.id === item.pizza.id && i.size === item.size));
    this.saveCartItems(items);
  }

  calculateTotal() {
    const items = this.getCartItems();
    return items.reduce((total: number, item: { quantity: number; price: number; }) => total + (item.quantity * item.price), 0);
  }
}
