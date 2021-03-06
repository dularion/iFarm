import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AnimalDetailPage} from '../animal-detail/animal-detail';
import {AnimalProvider} from '../../providers/animal/animal';
import {Api} from '../../providers/api/api';
import {DateProvider} from '../../providers/date/date';
import {FirebaseFilter} from '../../types/firebase-filter';

@Component({
  selector: 'animal-list',
  templateUrl: 'animal-list.html'
})
export class AnimalListPage {
  selectedItem: any;
  icons: string[];
  items: any = [];
  segmentSelection: string;
  page:{isLoading: boolean, filter:Array<FirebaseFilter>} = {
    isLoading: true,
    filter: []
  };

  constructor(public navCtrl: NavController, public animalProvider: AnimalProvider,
              private api: Api) {
    this.segmentSelection = '';
  }

  ionViewWillEnter(){
    this.loadData();
  }

  private loadData() {
    if(this.segmentSelection == 'babies'){
      this.api.query('animals', this.page.filter, 'dateOfBirth', 'desc').then(data => {
          this.items = data;
          this.page.isLoading = false;
        }
      );
    } else {
      this.api.query('animals', this.page.filter, 'dateCreated', 'desc').then(data => {
          this.items = data;
          this.page.isLoading = false;
        }
      );
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(AnimalDetailPage, {
      item: item
    });
  }

  addNewItem() {
    this.navCtrl.push(AnimalDetailPage, {
      isNew: true
    });
  }

  getTypeForImage(item) {
    return this.animalProvider.getTypeForImage(item);
  }

  filterChanged() {
    this.page.filter = [];

    if(this.segmentSelection == 'babies'){
      this.page.filter.push({fieldPath: 'dateOfBirth', opStr: '>=', value: DateProvider.twentyMonthsAgo().toDate()});
    } else{
      this.page.filter.push({fieldPath: 'gender', opStr: '==', value: this.segmentSelection});
    }

    this.loadData();
  }
}
