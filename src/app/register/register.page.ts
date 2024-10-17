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
  showPassword = false;
  showConfirmPassword = false;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        cpf: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.mustMatch('password', 'confirmPassword')
      }
    );
  }

  // Função para formatar o CPF conforme o usuário digita
  formatCPF(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (value.length > 11) {
      value = value.substring(0, 11); // Limita a 11 dígitos
    }
    // Aplica a máscara de CPF
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    // Atualiza o valor do input e do formControl com o CPF formatado
    event.target.value = value;
    this.registerForm.get('cpf')?.setValue(value);
  }

  // Função para formatar o telefone conforme o usuário digita
  formatPhone(event: any) {
    let input = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (input.length > 11) {
      input = input.substring(0, 11); // Limita a 11 dígitos
    }

    // Adiciona a máscara de telefone
    const formatted = input.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    event.target.value = formatted;
    this.registerForm.get('phone')?.setValue(formatted); // Atualiza o valor do formControl
  }

  // Verifica se o CPF já está cadastrado
  isCPFUnique(cpf: string): boolean {
    const users = this.getStoredUsers();
    return !users.some((user: any) => user.cpf === cpf);
  }

  // Verifica se o e-mail já está cadastrado
  isEmailUnique(email: string): boolean {
    const users = this.getStoredUsers();
    return !users.some((user: any) => user.email === email);
  }

  // Obtém os usuários armazenados no localStorage
  getStoredUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  // Validador customizado para confirmar se as senhas correspondem
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

  // Submissão do formulário
  onSubmit() {
    if (this.registerForm.valid) {
      const cpfValue = this.registerForm.get('cpf')?.value;
      const emailValue = this.registerForm.get('email')?.value;

      // Verifica se o CPF e o e-mail são únicos antes de proceder
      if (!this.isCPFUnique(cpfValue)) {
        alert('CPF já cadastrado. Por favor, use outro CPF.');
        return;
      }

      if (!this.isEmailUnique(emailValue)) {
        alert('E-mail já cadastrado. Por favor, use outro e-mail.');
        return;
      }

      // Cria o novo usuário a partir do formulário
      const newUser = {
        name: this.registerForm.get('name')?.value,
        cpf: cpfValue,
        phone: this.registerForm.get('phone')?.value,
        email: emailValue,
        address: this.registerForm.get('address')?.value,
        password: this.registerForm.get('password')?.value,
      };

      // Obtém os usuários existentes ou inicializa um array vazio
      const storedUsers = this.getStoredUsers();

      // Adiciona o novo usuário ao array
      storedUsers.push(newUser);

      // Salva o array atualizado no localStorage
      localStorage.setItem('users', JSON.stringify(storedUsers));

      // Navega para a página de login após o registro bem-sucedido
      this.navCtrl.navigateRoot('/login');
    }
  }

  // Função para navegação (voltar)
  goBack() {
    this.navCtrl.back();
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
