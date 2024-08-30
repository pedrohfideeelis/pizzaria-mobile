// Importações no início do arquivo
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.mustMatch('password', 'confirmPassword') });
  }

  // Função para formatar o CPF conforme o usuário digita
  formatCPF(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    event.target.value = value;
    this.registerForm.get('cpf')?.setValue(value); // Atualiza o formControl com o valor formatado
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
    if (this.registerForm.valid) {
      const userData = {
        name: this.registerForm.get('name')?.value,
        cpf: this.registerForm.get('cpf')?.value,
        phone: this.registerForm.get('phone')?.value,
        email: this.registerForm.get('email')?.value,
        address: this.registerForm.get('address')?.value,
        password: this.registerForm.get('password')?.value,
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      this.navCtrl.navigateRoot('/login');
    }
  }
}
