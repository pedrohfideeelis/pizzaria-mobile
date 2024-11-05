import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Order } from 'src/models/order.model';

@Component({
  selector: 'perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class Perfil implements OnInit {
  perfilForm!: FormGroup;
  user: any;
  pedidos: any[] = [];
  editMode = false;
  currentSection: string = 'meusDados'; // Define qual seção deve ser exibida

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.perfilForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }]
    });

    // Carregar usuário logado do localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.user = JSON.parse(loggedInUser);
      console.log('Usuário Logado:', this.user);

      this.perfilForm.patchValue({
        email: this.user.email,
        phone: this.user.phone,
        address: this.user.address
      });

      // Exemplo de carregamento de pedidos
      this.pedidos = this.loadPedidos();

      this.cdr.detectChanges();
    } else {
      console.error('Nenhum usuário logado encontrado');
    }

    this.loadCompletedOrders();
  }

  loadPedidos() {
    // Simulação de pedidos (pode ser substituído por requisição de API)
    return [
      { id: 1, status: 'Entregue', total: 49.99 },
      { id: 2, status: 'Em preparação', total: 29.99 },
      { id: 3, status: 'Entregue', total: 15.50 }
    ];
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

  showSection(section: string) {
    this.currentSection = section;
  }

  loadCompletedOrders() {
    const completedOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]') as Order[];
    this.pedidos = completedOrders.filter(order => order.status === 'CONCLUÍDO');
  }
}

