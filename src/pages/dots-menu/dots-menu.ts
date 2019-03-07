import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

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
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DotsMenuPage', this.navParams);
    this.menuItems = this.navParams.data;
  }

  close(item) {
    this.viewCtrl.dismiss(item);
  }

}
