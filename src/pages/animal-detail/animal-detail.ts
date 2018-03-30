import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'animal-detail',
  templateUrl: 'animal-detail.html'
})
export class AnimalDetailPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
}
