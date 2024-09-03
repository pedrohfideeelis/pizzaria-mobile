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
  
      // Obtém os usuários cadastrados
      const storedData = localStorage.getItem('users');
      if (storedData) {
        const users = JSON.parse(storedData);
  
        // Procura um usuário que corresponda ao email e senha fornecidos
        const user = users.find((u: any) => u.email === email && u.password === password);
  
        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
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
