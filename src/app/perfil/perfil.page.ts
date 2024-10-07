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
  editMode = false;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef, private navController: NavController) { }

  ngOnInit() {
    this.perfilForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }]
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
    const storedUsers = localStorage.getItem('users');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (storedUsers && loggedInUser) {
      const users = JSON.parse(storedUsers);
      const userIndex = users.findIndex((user: any) => user.email === this.user.email);

      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        localStorage.setItem('users', JSON.stringify(users));

        const updatedLoggedInUser = { ...this.user, ...updatedUser };
        localStorage.setItem('loggedInUser', JSON.stringify(updatedLoggedInUser));

        this.editMode = false;
        this.disableFields();
      }
    }
  }

  enableFields() {
    this.perfilForm.controls['email'].enable();
    this.perfilForm.controls['phone'].enable();
    this.perfilForm.controls['address'].enable();
  }

  disableFields() {
    this.perfilForm.controls['email'].disable();
    this.perfilForm.controls['phone'].disable();
    this.perfilForm.controls['address'].disable();
  }

  toggleEdit() {
    this.editMode = !this.editMode;

    if (this.editMode) {
      this.enableFields();
    } else {
      this.disableFields();
    }
  }

  onCancelEdit() {
    this.perfilForm.patchValue({
      email: this.user.email,
      phone: this.user.phone,
      address: this.user.address
    });

    this.disableFields();
    this.editMode = false;
  }

  onLogout() {
    localStorage.removeItem('loggedInUser');
    this.navController.navigateRoot('/login');
  }
}
