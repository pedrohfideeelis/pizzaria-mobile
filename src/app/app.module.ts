import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressModalComponent } from './address-modal/address-modal.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';

@NgModule({
  declarations: [AppComponent, CartComponent, ForgotPasswordComponent, CheckoutComponent, AddressModalComponent, OrderTrackingComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },[provideNgxMask()],],
  bootstrap: [AppComponent],
})
export class AppModule { }
