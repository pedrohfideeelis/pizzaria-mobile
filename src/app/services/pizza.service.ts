import { Injectable } from '@angular/core';
import { Pizza } from '../../models/pizza.model';

@Injectable({
    providedIn: 'root'
})
export class PizzaService {
    private pizzas: Pizza[] = [
        {
            id: 1,
            name: 'Pizza de Sushi',
            imageUrl: 'assets/images/PIZZA_SUSHI.jpeg',
            price: 49.99,
            description: 'Massa de alga e arroz, molho shoyo, sushi de salmão, sashimi, brócolis e tomate',
        },
        {
            id: 2,
            name: 'Pizza de Pepperoni',
            imageUrl: 'assets/images/PIZZA_PEPPERONI.jpeg',
            price: 29.99,
            description: 'Molho de tomate, queijo mussarela, pepperoni e orégano',
        },
        {
            id: 3,
            name: 'Pizza de Atum',
            imageUrl: 'assets/images/PIZZA_ATUM.jpeg',
            price: 29.99,
            description: 'Molho de tomate, queijo mussarela, atum, pepino, cebola e tomate',
        },
        {
            id: 4,
            name: 'Pizza de Sashimi',
            imageUrl: 'assets/images/PIZZA_SASHIMI.jpeg',
            price: 59.99,
            description: 'Molho shoyo, queijo mussarela, sashimi, pepino, brócolis e tomate',
        },
        {
            id: 5,
            name: 'Pizza de Carne Seca',
            imageUrl: 'assets/images/PIZZA_CARNE_SECA.jpeg',
            price: 39.99,
            description: 'Molho de tomate, queijo mussarela, carne seca, manjericão e tomate',
        },
        {
            id: 6,
            name: 'Pizza de Guioza',
            imageUrl: 'assets/images/PIZZA_GUIOZA.jpeg',
            price: 59.99,
            description: 'Molho de tomate, molho shoyo, queijo e guioza',
        },
        {
            id: 7,
            name: 'Pizza de Queijo',
            imageUrl: 'assets/images/PIZZA_QUEIJO.jpeg',
            price: 29.99,
            description: 'Molho de tomate, queijo mussarela, queijo de cabra, provolone, orégano, tomate e manjericão',
        },
        {
            id: 8,
            name: 'Pizza de Frango',
            imageUrl: 'assets/images/PIZZA_FRANGO.jpeg',
            price: 29.99,
            description: 'Molho de tomate, queijo mussarela, frango desfiado, requeijão e catupiry',
        },
        {
            id: 9,
            name: 'Pizza Vegetariana',
            imageUrl: 'assets/images/PIZZA_VEGETARIANA.jpeg',
            price: 29.99,
            description: 'Molho de tomate, queijo mussarela, brócolis, pepino, cebola, tomate, azeitona e pimentão',
        },
    ];

    getPizzas() {
        return this.pizzas;
    }
}
