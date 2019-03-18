import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {VehicleDetailPage} from '../vehicle-detail/vehicle-detail';
import {Api} from '../../providers/api/api';
import {DateProvider} from "../../providers/date/date";


@Component({
  selector: 'page-vehicle-list',
  templateUrl: 'vehicle-list.html',
})
export class VehicleListPage {
  selectedItem: any;
  items: any = [];
  type: string;
  isLoading = true;

  constructor(public navCtrl: NavController, private api: Api) {
    this.type = '';
  }

  ionViewWillEnter() {
    this.api.query('vehicles').then(data => {
        this.items = data;
        this.isLoading = false;
      }
    );
  }

  itemTapped(event, item) {
    this.navCtrl.push(VehicleDetailPage, {
      item: item
    });
  }

  addNewItem() {
    this.navCtrl.push(VehicleDetailPage, {
      isNew: true
    });
  }

  loadData() {
    this.isLoading = true;
    this.api.query('vehicles',[{fieldPath: 'type', opStr: '==', value: this.type}]).then(data => {
        this.items = data;
        this.isLoading = false;
      }
    );
  }
}
