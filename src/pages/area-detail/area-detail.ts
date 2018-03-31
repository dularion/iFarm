import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'area-detail',
  templateUrl: 'area-detail.html'
})
export class AreaDetailPage {
  selectedItem: any;

  constructor(public navParams: NavParams, public navCtrl: NavController) {
    if(navParams.get('isNew')){
      this.selectedItem = {}
    }else{
      this.selectedItem = navParams.get('item');
    }
  }

  save(){
    this.navCtrl.pop();
  }
}
