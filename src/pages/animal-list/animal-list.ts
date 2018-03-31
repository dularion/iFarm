import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AnimalDetailPage} from '../animal-detail/animal-detail';
import {HttpClient} from '@angular/common/http';
import {AnimalProvider} from '../../providers/animal/animal';

@Component({
  selector: 'animal-list',
  templateUrl: 'animal-list.html'
})
export class AnimalListPage {
  selectedItem: any;
  icons: string[];
  items: any = [];
  type: string;

  constructor(public navCtrl: NavController, private http: HttpClient, public animalProvider: AnimalProvider) {
    this.type = '';
  }

  ionViewDidLoad(){
    this.http.get('assets/animals.json').subscribe(data => this.items = data);
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
