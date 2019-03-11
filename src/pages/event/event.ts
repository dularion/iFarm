import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {DotsMenuPage} from "../dots-menu/dots-menu";
import {DotsMenuProvider} from "../../providers/dots-menu/dots-menu";
import {AnimalProvider} from "../../providers/animal/animal";
import {Api} from "../../providers/api/api";
import moment from 'moment';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
  eventForm;
  eventEntity;
  menu;
  table: String;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dotsMenuProvider: DotsMenuProvider,
              public animalProvider: AnimalProvider,
              private api: Api,
              public popoverCtrl: PopoverController,
              public fb: FormBuilder,) {

    this.isNew = !this.navParams.data.table && !this.navParams.data.entry;
    if(this.navParams.data.entry){
      this.eventEntity = this.navParams.data.entry;
    }
    this.table = this.navParams.data.table;
    this.eventForm = this.createForm();
    this.initDotsMenuItems();
  }

  ionViewDidLoad() {
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
    console.log('FORM', this.eventForm);
  }

  deleteRecord(){

  }

  createForm(){
    return this.fb.group({
      entryId: new FormControl(''),
      title: new FormControl('',[Validators.required, Validators.minLength(5)]),
      eventDate: new FormControl(new Date(new Date().getTime() + (-(new Date().getTimezoneOffset()* 1000))), [Validators.required, this.validateDate]),
      description: new FormControl('',),

    });
  }

  validateDate(control: AbstractControl){
    // console.log('control.value', control.value, new Date());
    // console.log('DIFF', (new Date(control.value).getTime()) - new Date().getTime());
    // console.log('<', new Date(control.value).getTime(), new Date().getTime());
    if ((new Date(control.value).getTime()) - new Date().getTime() < new Date().getTime() + (-(new Date().getTimezoneOffset()* 1000))) {
      return { invalidDate: true };
    }
    return null;
  }

  initDotsMenuItems() {
    this.menu = [
      this.dotsMenuProvider.SAVE,
      this.dotsMenuProvider.DELETE_RECORD,
    ];
  }

  getEventImage(){
    if(this.table == AnimalProvider.ANIMAL_TABLE_NAME){
      return "assets/imgs/animal-"+this.animalProvider.getTypeForImage(this.eventEntity)+"_image.png";
    }else if(this.table == 'areas'){

    }else if(this.table == 'vehicles') {

    }
  }

  getToday() {

    return moment().format('YYYY-MM-DD');
  }

}
