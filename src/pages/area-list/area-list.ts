import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {AreaDetailPage} from '../area-detail/area-detail';

@Component({
  selector: 'area-list',
  templateUrl: 'area-list.html'
})
export class AreaListPage {
  selectedItem: any;
  icons: string[];
  items: any = [];
  type: string;

  constructor(public navCtrl: NavController, private http: HttpClient) {
    this.type = '';
  }

  ionViewDidLoad(){
    this.http.get('assets/areas.json').subscribe(data => this.items = data);
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(AreaDetailPage, {
      item: item
    });
  }
}
