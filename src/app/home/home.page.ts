import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class Home implements OnInit {
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

  firstName: string = '';

  ngOnInit() {
    // Recupera o usuário logado do localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    // Extrai o primeiro nome do usuário
    if (loggedInUser && loggedInUser.name) {
      this.firstName = loggedInUser.name.split(' ')[0]; // Pega o primeiro nome
    }
  }
}
