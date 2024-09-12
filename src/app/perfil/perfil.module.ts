import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Perfil } from './perfil.page';

import { PerfilPageRoutingModule } from './perfil-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfilPageRoutingModule
  ],
  declarations: [Perfil]
})
export class PerfilPageModule {}
