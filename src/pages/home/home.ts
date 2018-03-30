import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {IFarmProvider} from '../../app/ifarm.app.provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages:any;

  constructor(public navCtrl: NavController, private ifarmAppProvider: IFarmProvider) {
    this.pages = this.ifarmAppProvider.getPages();
  }

  openPage(page) {
    this.navCtrl.push(page.component);
  }

}
