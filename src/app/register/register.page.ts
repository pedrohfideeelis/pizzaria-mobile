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
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        cpf: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.mustMatch('password', 'confirmPassword') }
    );
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

  // Função para formatar o telefone conforme o usuário digita
  formatPhone(event: any) {
    let input = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (input.length > 11) {
      input = input.substring(0, 11); // Limita a 11 dígitos
    }
    // Adiciona a máscara de telefone
    const formatted = input.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
    event.target.value = formatted;
    this.registerForm.get('phone')?.setValue(formatted); // Atualiza o valor do formControl
  }

  // Verifica se o CPF já está cadastrado
  isCPFUnique(cpf: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return !users.some((user: any) => user.cpf === cpf);
  }

  // Verifica se o e-mail já está cadastrado
  isEmailUnique(email: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return !users.some((user: any) => user.email === email);
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
      const newUser = {
        name: this.registerForm.get('name')?.value,
        cpf: this.registerForm.get('cpf')?.value,
        phone: this.registerForm.get('phone')?.value,
        email: this.registerForm.get('email')?.value,
        address: this.registerForm.get('address')?.value,
        password: this.registerForm.get('password')?.value,
      };
  
      // Obtém os usuários existentes ou inicializa um array vazio
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
  
      // Adiciona o novo usuário ao array
      storedUsers.push(newUser);
  
      // Salva o array atualizado no localStorage
      localStorage.setItem('users', JSON.stringify(storedUsers));
      this.navCtrl.navigateRoot('/login');
    }
  }  
}
