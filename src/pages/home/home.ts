import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PageProvider} from '../../providers/page/page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pages:any;

  constructor(public navCtrl: NavController, private pageProvider: PageProvider) {
    this.pages = this.pageProvider.getPages();
  }

  openPage(page) {
    this.navCtrl.push(page.component);
  }

}
