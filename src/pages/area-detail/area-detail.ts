import { Component } from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
  selector: 'area-detail',
  templateUrl: 'area-detail.html'
})
export class AreaDetailPage {
  selectedItem: any;

  constructor(public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
  }
}
