import { Component } from '@angular/core';
import {AlertController, ViewController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'photo-modal',
  templateUrl: 'photo-modal.html'
})
export class PhotoModalPage {

  constructor(public viewCtrl: ViewController, private camera: Camera, public alertCtrl: AlertController) {

  }



  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }


  openNotImplemented(){
    let alert = this.alertCtrl.create({
      title: 'Nicht implementiert',
      subTitle: 'Kommt bald...',
      buttons: ['OK']
    });
    alert.present();
  }

  openCamera(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log('%c base64Image', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', base64Image);
    }, (err) => {
      // Handle error
      console.error(err);
    });


  }
}
