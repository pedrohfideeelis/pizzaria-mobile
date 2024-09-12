import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class Perfil implements OnInit {
  perfilForm!: FormGroup;
  user: any;
  editEmail = false;
  editPhone = false;
  editAddress = false;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.perfilForm = this.formBuilder.group({
      email: [''],
      phone: [''],
      address: ['']
    });

    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      this.user = JSON.parse(loggedInUser);

      console.log('Usuário Logado:', this.user);

      this.perfilForm.patchValue({
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address
      });

      this.cdr.detectChanges();
    } else {
      console.error('Nenhum usuário logado encontrado');
    }
  }

  onSave() {
    const updatedUser = this.perfilForm.value;
    const storedUsers = localStorage.getItem('users'); // Obtemos o array de usuários
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (storedUsers && loggedInUser) {
      const users = JSON.parse(storedUsers);
      const userIndex = users.findIndex((user: any) => user.email === this.user.email); // Encontre o índice do usuário

      if (userIndex !== -1) {
        // Atualize o usuário no array de usuários
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        localStorage.setItem('users', JSON.stringify(users));

        // Atualize o usuário logado
        const updatedLoggedInUser = { ...this.user, ...updatedUser };
        localStorage.setItem('loggedInUser', JSON.stringify(updatedLoggedInUser));
      }
    }
  }

  toggleEdit(field: string) {
    switch (field) {
      case 'email':
        this.editEmail = !this.editEmail;
        break;
      case 'phone':
        this.editPhone = !this.editPhone;
        break;
      case 'address':
        this.editAddress = !this.editAddress;
        break;
    }
  }
}
