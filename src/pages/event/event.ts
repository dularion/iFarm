import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import {DotsMenuPage} from "../dots-menu/dots-menu";
import {DotsMenuProvider} from "../../providers/dots-menu/dots-menu";
import {AnimalProvider} from "../../providers/animal/animal";
import moment from 'moment';
import {AbstractControl, FormBuilder, FormControl, Validators} from "@angular/forms";
import {AlertController} from "ionic-angular";
import {EventListPage} from "./event-list/event-list";
import {EventProvider} from "../../providers/event/event";

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
              private toastCtrl: ToastController,
              public dotsMenuProvider: DotsMenuProvider,
              public animalProvider: AnimalProvider,
              public eventProvider: EventProvider,
              private alertCtrl: AlertController,
              public popoverCtrl: PopoverController,
              public fb: FormBuilder,) {

    this.isNew = !this.navParams.data.entry.entryId;
    // if (this.isNew) {
    //   this.presentAlert();
    // }
    if (this.navParams.data.entry) {
      this.eventEntity = this.navParams.data.entry;
    }
    this.table = this.navParams.data.table;
    this.eventForm = this.createForm();
    this.initDotsMenuItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage', this.navParams.data, this.isNew);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'No entity',
      subTitle: 'No entity to create event!',
      buttons: [{
        text: 'Go to list',
        handler: () => {
          this.navCtrl.push(EventListPage);
        }
      }]
    });
    alert.present();
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

  updateRecord() {
    if (this.eventForm.valid) {
      let item = this.eventForm.value;
      item.id = this.eventEntity.id;
      this.eventProvider.updateEvent(EventProvider.EVENT_TABLE_NAME, item).then((resp) => {
        this.presentToast();
      })
    }
  }

  saveRecord() {
    if (this.eventForm.valid) {
      this.eventProvider.save(EventProvider.EVENT_TABLE_NAME, this.eventForm.value).then((resp) => {
        this.presentToast();
      })
    }
  }

  deleteRecord() {
    this.eventProvider.deleteEvent(EventProvider.EVENT_TABLE_NAME, this.eventEntity).then((resp) => {
      this.navCtrl.pop();
    })
  }

  createForm() {
    return this.fb.group({
      dateCreated: new FormControl(this.eventEntity.dateCreated || new Date(), [Validators.required]),
      entryId: new FormControl(this.eventEntity.id, [Validators.required]),
      title: new FormControl(this.eventEntity.title || '', [Validators.required, Validators.minLength(5)]),
      eventDate: new FormControl(this.eventEntity.eventDate || new Date(), [Validators.required, this.validateDate]),
      description: new FormControl(this.eventEntity.description || ''),
      table: new FormControl(this.eventEntity.table || this.table, [Validators.required])
    });
  }

  validateDate(control: AbstractControl) {
    let offsetMilisec = new Date().getTimezoneOffset() * 60000;
    let timeWithOffset = new Date(control.value).getTime() + offsetMilisec;
    let now = new Date().getTime();
    if (timeWithOffset < now) {
      return {invalidDate: true};
    }
    return null;
  }

  initDotsMenuItems() {
    this.menu = [
      this.dotsMenuProvider.SAVE,
      this.dotsMenuProvider.DELETE_RECORD,
    ];
  }

  getEventImage() {
    if (this.table == AnimalProvider.ANIMAL_TABLE_NAME) {
      return "assets/imgs/animal-" + this.animalProvider.getTypeForImage(this.eventEntity) + "_image.png";
    } else if (this.table == 'areas') {

    } else if (this.table == 'vehicles') {

    }
  }

  getToday() {
    return moment().format('YYYY-MM-DD');
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Event was added successfully',
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      this.navCtrl.pop();
      this.navCtrl.push(EventListPage);
    });

    toast.present();
  }

}
