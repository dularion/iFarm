import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AreaDetailPage} from '../area-detail/area-detail';
import {HttpClient} from '@angular/common/http';

/**
 * Generated class for the VehicleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vehicle-list',
  templateUrl: 'vehicle-list.html',
})
export class VehicleListPage {
  selectedItem: any;
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
