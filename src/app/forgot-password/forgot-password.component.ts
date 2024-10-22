import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  verificationCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private navCtrl: NavController, private alertController: AlertController) { }

  async onSubmit() {
    const users = this.getStoredUsers();
    const user = users.find((u: any) => u.verificationCode === this.verificationCode); // Verifique se o código existe

    if (user) {
      if (this.newPassword === this.confirmPassword) {
        user.password = this.newPassword; // Atualize a senha do usuário
        localStorage.setItem('users', JSON.stringify(users)); // Salve as alterações

        await this.showAlert('Sucesso', 'Sua senha foi alterada com sucesso!', 'OK');
        await this.navCtrl.navigateRoot('/login'); // Redirecione para a tela de login
      } else {
        await this.showAlert('Erro', 'As senhas não coincidem. Tente novamente.', 'OK');
      }
    } else {
      await this.showAlert('Erro', 'Código de verificação inválido. Verifique e tente novamente.', 'OK');
    }
  }

  // Função para obter usuários armazenados no localStorage
  getStoredUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  cancel() {
    this.navCtrl.navigateRoot('/login');
  }

  // Função para exibir alertas
  async showAlert(header: string, message: string, buttonText: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [buttonText],
    });

    await alert.present();
  }

  // Função para alternar a visibilidade da senha
  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
