import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';

      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const userData = JSON.parse(storedData);
        if (userData.email === email && userData.password === password) {
          localStorage.setItem('loggedInUser', JSON.stringify(userData));
          this.navCtrl.navigateRoot('/tabs'); // Redireciona para a página inicial após o login
        } else {
          alert('Credenciais inválidas');
        }
      } else {
        alert('Nenhum usuário registrado');
      }
    }
  }
}
