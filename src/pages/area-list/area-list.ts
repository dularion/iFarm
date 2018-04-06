import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {AreaDetailPage} from '../area-detail/area-detail';
import {Api} from '../../providers/api/api';

@Component({
  selector: 'area-list',
  templateUrl: 'area-list.html'
})
export class AreaListPage {
  selectedItem: any;
  items: any = [];
  type: string;
  page:{isLoading: boolean} = {
    isLoading: true
  };

  constructor(public navCtrl: NavController, private http: HttpClient, private api: Api) {
    this.type = '';
  }

  ionViewWillEnter() {
    this.api.query('areas').then(data => {
        this.items = data;
        this.page.isLoading = false;
      }
    );
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(AreaDetailPage, {
      item: item
    });
  }

  addNewItem() {
    this.navCtrl.push(AreaDetailPage, {
      isNew: true
    });
  }
}
