import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AnimalDetailPage} from '../animal-detail/animal-detail';
import {HttpClient} from '@angular/common/http';
import {AnimalProvider} from '../../providers/animal/animal';
import {Api} from '../../providers/api/api';

@Component({
  selector: 'animal-list',
  templateUrl: 'animal-list.html'
})
export class AnimalListPage {
  selectedItem: any;
  icons: string[];
  items: any = [];
  type: string;
  page:{isLoading: boolean} = {
    isLoading: true
  };

  constructor(public navCtrl: NavController, private http: HttpClient, public animalProvider: AnimalProvider, private api: Api) {
    this.type = '';
  }

  ionViewDidLoad(){
    this.api.query('animals').then(data => {
        this.items = data;
        this.page.isLoading = false;
      }
    );
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
}
