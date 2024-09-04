import { Component } from '@angular/core';

@Component({
  selector: 'cardapio',
  templateUrl: 'cardapio.page.html',
  styleUrls: ['cardapio.page.scss']
})
export class Cardapio {
  pizzas = [
    {
      name: 'Pizza de Sushi',
      imageUrl: 'assets/images/PIZZA.jpg',
      price: 29.99,
      description: 'Massa de alga e arroz, molho shoyo, sushi de salmão, sashimi, brócolis e tomate'
    },
    {
      name: 'Pizza de Sushi',
      imageUrl: 'assets/images/PIZZA.jpg',
      price: 29.99,
      description: 'Massa de alga e arroz, molho shoyo, sushi de salmão, sashimi, brócolis e tomate'
    },
    {
      name: 'Pizza de Sushi',
      imageUrl: 'assets/images/PIZZA.jpg',
      price: 29.99,
      description: 'Massa de alga e arroz, molho shoyo, sushi de salmão, sashimi, brócolis e tomate'
    },
    {
      name: 'Pizza de Sushi',
      imageUrl: 'assets/images/PIZZA.jpg',
      price: 29.99,
      description: 'Massa de alga e arroz, molho shoyo, sushi de salmão, sashimi, brócolis e tomate'
    },
    {
      name: 'Pizza de Sushi',
      imageUrl: 'assets/images/PIZZA.jpg',
      price: 29.99,
      description: 'Massa de alga e arroz, molho shoyo, sushi de salmão, sashimi, brócolis e tomate'
    }
  ];
  
}
