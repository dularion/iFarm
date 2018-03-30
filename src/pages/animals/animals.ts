import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AnimalDetailPage} from '../animal-detail/animal-detail';

@Component({
  selector: 'animal-list',
  templateUrl: 'animals.html'
})
export class AnimalsPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string, dateOfBirth: Date}>;
  type: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.type = 'all';
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: '#' + Math.floor(Math.random()*90000) + 10000,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        dateOfBirth: new Date()
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(AnimalDetailPage, {
      item: item
    });
  }
}
