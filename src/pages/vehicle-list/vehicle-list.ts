import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {VehicleDetailPage} from '../vehicle-detail/vehicle-detail';
import * as firebase from "firebase";
import {Api} from '../../providers/api/api';


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
  page:{isLoading: boolean} = {
    isLoading: true
  };

  constructor(public navCtrl: NavController, private http: HttpClient, private api: Api) {
    this.type = '';
  }

  ionViewWillEnter(){
    this.api.query('vehicles').then(data => {
        this.items = data;
        this.page.isLoading = false;
      }
    );
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(VehicleDetailPage, {
      item: item
    });
  }

  addNewItem() {
    this.navCtrl.push(VehicleDetailPage, {
      isNew: true
    });
  }
}
