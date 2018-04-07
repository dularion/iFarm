import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {AreaDetailPage} from '../area-detail/area-detail';
import {Api} from '../../providers/api/api';
import {FirebaseFilter} from '../../types/firebase-filter';

@Component({
  selector: 'area-list',
  templateUrl: 'area-list.html'
})
export class AreaListPage {
  selectedItem: any;
  items: any = [];
  segmentSelection: string;
  page:{isLoading: boolean, filter:Array<FirebaseFilter>} = {
    isLoading: true,
    filter: []
  };

  constructor(public navCtrl: NavController, private http: HttpClient, private api: Api) {
    this.segmentSelection = '';
  }

  ionViewWillEnter() {
    this.loadData();
  }

  private loadData() {
    this.api.query('areas', this.page.filter).then(data => {
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

  filterChanged() {
    this.page.filter = [{fieldPath: 'type', opStr: '==', value: this.segmentSelection}];

    this.loadData();
  }
}
