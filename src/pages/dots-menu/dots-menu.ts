import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {DotsMenuProvider} from "../../providers/dots-menu/dots-menu";

/**
 * Generated class for the DotsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dots-menu',
  templateUrl: 'dots-menu.html',
})
export class DotsMenuPage {

  menuItems = [];
  icon = 'save';

  constructor(public navCtrl: NavController,
              public dotsMenuProvider: DotsMenuProvider,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.menuItems = dotsMenuProvider.setupCurrentMenu(this.navParams.data);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DotsMenuPage', this.navParams);
    console.log('MENU', this.menuItems);
  }

  close(item) {
    this.viewCtrl.dismiss(item);
  }

}
