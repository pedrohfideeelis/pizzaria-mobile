import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Perfil } from './perfil.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PerfilPageRoutingModule } from './perfil-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PerfilPageRoutingModule
  ],
  declarations: [Perfil]
})
export class PerfilPageModule {}
