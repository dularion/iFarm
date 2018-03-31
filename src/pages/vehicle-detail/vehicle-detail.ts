import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VehicleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vehicle-detail',
  templateUrl: 'vehicle-detail.html',
})
export class VehicleDetailPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(navParams.get('isNew')){
      this.selectedItem = {}
    }else{
      this.selectedItem = navParams.get('item');
    }
  }

  save(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleDetailPage');
  }

}
