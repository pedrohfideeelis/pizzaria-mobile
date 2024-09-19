import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems';

  // BehaviorSubject para manter os itens do carrinho de forma reativa
  private cartItemsSubject = new BehaviorSubject<any[]>(this.loadCartItemsFromStorage());
  cartItems$ = this.cartItemsSubject.asObservable();

  // BehaviorSubject para manter a contagem de itens no carrinho
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor() {
    this.updateCartItemCount();
  }

  // Carrega os itens do carrinho do localStorage
  private loadCartItemsFromStorage(): any[] {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  // Salva os itens do carrinho no localStorage
  private saveCartItemsToStorage(items: any[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }

  // Retorna os itens atuais do carrinho
  getCartItems() {
    return this.cartItemsSubject.getValue();
  }

  // Adiciona um item ao carrinho
  addToCart(item: any) {
    const items = this.getCartItems();

    // Verifica se o item já existe no carrinho com base no id, tamanho e talvez sabor/notas
    const index = items.findIndex((i: any) =>
      i.pizza.id === item.pizza.id &&
      i.size === item.size &&
      i.notes === item.notes // Verifica se as notas/sabor são diferentes
    );

    if (index > -1) {
      // Se o item já existir (mesmo id, tamanho e notas), atualiza a quantidade
      items[index].quantity += item.quantity;
      items[index].totalPrice = items[index].quantity * items[index].pizza.price;
    } else {
      // Caso contrário, adiciona como um novo item
      items.push(item);
    }

    this.cartItemsSubject.next(items);
    this.saveCartItemsToStorage(items);
    this.updateCartItemCount();
  }

  // Atualiza a quantidade de um item no carrinho
  updateQuantity(item: any, quantity: number) {
    const items = this.getCartItems();
    const index = items.findIndex((i: any) => i.pizza.id === item.pizza.id && i.size === item.size);

    if (index > -1) {
      if (quantity <= 0) {
        items.splice(index, 1);
      } else {
        items[index].quantity = quantity;
        items[index].totalPrice = items[index].quantity * items[index].pizza.price;
      }

      this.cartItemsSubject.next(items);
      this.saveCartItemsToStorage(items);
      this.updateCartItemCount();
    }
  }

  // Remove um item do carrinho
  removeFromCart(index: number) {
    const items = this.getCartItems();
    items.splice(index, 1);
    this.cartItemsSubject.next(items);
    this.saveCartItemsToStorage(items);
    this.updateCartItemCount();
  }

  // Calcula o total do carrinho
  calculateTotal(): number {
    const items = this.getCartItems();
    return items.reduce((total, item) => total + item.totalPrice, 0);
  }

  // Atualiza a contagem de itens no carrinho
  private updateCartItemCount() {
    const items = this.getCartItems();
    const count = items.reduce((acc, item) => acc + item.quantity, 0);
    this.cartItemCountSubject.next(count);
  }
}
