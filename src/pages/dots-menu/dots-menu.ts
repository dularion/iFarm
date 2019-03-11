import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {DotsMenuProvider} from "../../providers/dots-menu/dots-menu";


@Component({
  selector: 'page-dots-menu',
  templateUrl: 'dots-menu.html',
})
export class DotsMenuPage {

  menuItems = [];

  constructor(public navCtrl: NavController,
              public dotsMenuProvider: DotsMenuProvider,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.menuItems = dotsMenuProvider.setupCurrentMenu(this.navParams.data);

  }

  ionViewDidLoad() {  }

  close(item) {
    this.viewCtrl.dismiss(item);
  }

}
