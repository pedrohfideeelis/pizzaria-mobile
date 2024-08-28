import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss']
})
export class PizzaCardComponent {
  @Input() name?: string;
  @Input() imageUrl?: string;
  @Input() price?: number;
  @Input() description?: string;
  @Input() showDescription: boolean = false;
}
