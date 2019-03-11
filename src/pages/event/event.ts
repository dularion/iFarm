import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {DotsMenuPage} from "../dots-menu/dots-menu";
import {DotsMenuProvider} from "../../providers/dots-menu/dots-menu";
import {AnimalProvider} from "../../providers/animal/animal";
import {Api} from "../../providers/api/api";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  isNew: boolean;
  form: FormGroup;
  eventEntity;
  menu;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dotsMenuProvider: DotsMenuProvider,
              public animalProvider: AnimalProvider,
              private api: Api,
              public popoverCtrl: PopoverController,
              public fb: FormBuilder,) {

  }

  ionViewDidLoad() {
    this.isNew = !this.navParams.data.table && !this.navParams.data.entry;
    if(this.navParams.data.entry){
      this.eventEntity = this.navParams.data.entry;
    }
    this.form = this.createForm();
    this.initDotsMenuItems();
    console.log('ionViewDidLoad EventPage', this.navParams.data, this.isNew);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(DotsMenuPage, this.menu);
    popover.onDidDismiss((item) => {
      if (item.name == this.dotsMenuProvider.DELETE_RECORD) {
        this.deleteRecord();
      }
      if (item.name == this.dotsMenuProvider.SAVE && !this.isNew) {
        this.updateRecord();
      }
      if (item.name == this.dotsMenuProvider.SAVE && this.isNew) {
        this.saveRecord();
      }
    });
    popover.present({
      ev: myEvent
    });
  }

  updateRecord(){

  }

  saveRecord(){

  }

  deleteRecord(){

  }

  createForm(){
    return this.fb.group({
      entryId: new FormControl(''),
      name: new FormControl(''),

    });
  }

  initDotsMenuItems() {
    this.menu = [
      this.dotsMenuProvider.SAVE,
      this.dotsMenuProvider.DELETE_RECORD,
    ];
  }

}
