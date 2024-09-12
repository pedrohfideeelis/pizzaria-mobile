import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  showLoading = true;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    setTimeout(() => {
      this.showLoading = false;
      this.navCtrl.navigateForward('/login');
    }, 4000);
  }
}
