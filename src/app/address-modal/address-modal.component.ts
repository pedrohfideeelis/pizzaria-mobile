import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-address-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Alterar Endereço</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Fechar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label position="floating">Novo Endereço</ion-label>
        <ion-input [(ngModel)]="newAddress"></ion-input>
      </ion-item>
      <ion-button expand="block" (click)="save()">Salvar Novo Endereço</ion-button>
    </ion-content>
  `,
})
export class AddressModalComponent {
  @Input() address: string = '';
  newAddress: string = '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.newAddress = this.address;
  }

  save() {
    this.modalController.dismiss(this.newAddress);
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
