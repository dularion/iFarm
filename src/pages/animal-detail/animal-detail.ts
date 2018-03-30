import { Component } from '@angular/core';
import {ModalController, NavParams} from 'ionic-angular';
import {PhotoModalPage} from '../photo-modal/photo-modal';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'animal-detail',
  templateUrl: 'animal-detail.html'
})
export class AnimalDetailPage {
  selectedItem: any;
  animals: any;

  constructor(public modalCtrl: ModalController, public navParams: NavParams, private http: HttpClient) {
    this.selectedItem = navParams.get('item');
  }

  ionViewDidLoad(){
    this.http.get('assets/animals.json').subscribe(data => this.animals = data);
  }


  changeImage(){
    let modal = this.modalCtrl.create(PhotoModalPage);
    modal.present();
  }
}
