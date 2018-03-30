import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AnimalDetailPage} from '../animal-detail/animal-detail';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'animal-list',
  templateUrl: 'animals.html'
})
export class AnimalsPage {
  selectedItem: any;
  icons: string[];
  items: any;
  type: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.type = '';
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
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
}
