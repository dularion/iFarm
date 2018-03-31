import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {PhotoModalPage} from '../photo-modal/photo-modal';
import {HttpClient} from '@angular/common/http';
import {AnimalProvider} from '../../providers/animal/animal';

@Component({
  selector: 'animal-detail',
  templateUrl: 'animal-detail.html'
})
export class AnimalDetailPage {
  selectedItem: any;
  animals: any;

  constructor(public modalCtrl: ModalController, public navParams: NavParams, private http: HttpClient,
              public navCtrl: NavController, public animalProvider: AnimalProvider) {
    if(navParams.get('isNew')){
      this.selectedItem = {}
    }else{
      this.selectedItem = navParams.get('item');
    }
  }

  ionViewDidLoad(){
    this.http.get('assets/animals.json').subscribe(data => this.animals = data);
  }


  changeImage(){
    let modal = this.modalCtrl.create(PhotoModalPage);
    modal.present();
  }


  save(){
    this.navCtrl.pop();
  }

  getTypeForImage(item) {
    return this.animalProvider.getTypeForImage(item);
  }
}
