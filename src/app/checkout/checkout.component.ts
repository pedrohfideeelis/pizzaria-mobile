import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  user: any;
  address: string = '';

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    // Verifica se há um usuário logado
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.user = JSON.parse(loggedInUser);
      this.address = this.user.address;
    } else {
      // Se não houver usuário logado, redireciona para a página de login
      alert('Nenhum usuário logado. Redirecionando para a página de login.');
      this.navCtrl.navigateRoot('/login');
    }
  }

  proceedToPayment() {
    // Lógica para proceder ao pagamento
    alert('Pagamento iniciado!');
  }

  goBack() {
    this.navCtrl.back();
  }
}
