import { Component } from '@angular/core';
import {ModalController} from 'ionic-angular';
import {PhotoModalPage} from '../photo-modal/photo-modal';

@Component({
  selector: 'animal-detail',
  templateUrl: 'animal-detail.html'
})
export class AnimalDetailPage {
  selectedItem: any;

  constructor(public modalCtrl: ModalController) {

  }


  changeImage(){
    let modal = this.modalCtrl.create(PhotoModalPage);
    modal.present();
  }
}
