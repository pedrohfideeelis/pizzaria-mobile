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
  showPassword = false;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
      } else {
        matchingControl?.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';

      const storedData = localStorage.getItem('users');
      if (storedData) {
        const users = JSON.parse(storedData);

        const user = users.find((u: any) => u.email === email && u.password === password);

        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          localStorage.setItem('loggedInUserEmail', email);
          this.navCtrl.navigateRoot('/tabs');
        } else {
          alert('Credenciais inválidas');
        }
      } else {
        alert('Nenhum usuário registrado');
      }
    }
  }

  navigateToForgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
