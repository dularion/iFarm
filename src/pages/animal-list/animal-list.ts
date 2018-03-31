import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AnimalDetailPage} from '../animal-detail/animal-detail';
import {HttpClient} from '@angular/common/http';
import moment from 'moment';

@Component({
  selector: 'animal-list',
  templateUrl: 'animal-list.html'
})
export class AnimalListPage {
  selectedItem: any;
  icons: string[];
  items: any = [];
  type: string;

  constructor(public navCtrl: NavController, private http: HttpClient) {
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

  getTypeForImage(item) {
    let twentyMonthsAgo = moment().add(-20, 'M');
    if(moment(item.dateOfBirth).isAfter(twentyMonthsAgo)){
      return 'baby';
    }

    return item.gender;
  }
}
