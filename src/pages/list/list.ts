import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {StorageProvider} from "../../providers/storage/storage";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  showLanguageSettings = false;
  availableLanguages = ['DE', 'EN'];
  currentLang = 'DE';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storageProvider: StorageProvider,
              public translate: TranslateService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 5; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    this.currentLang = translate.currentLang.toLocaleUpperCase();
  }

  selectLanguage(lang) {
    lang = lang.toLocaleLowerCase();
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.storageProvider.setValueInStorage(this.storageProvider.DEFAULT_LANGUAGE_KEY, lang);
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  toggleSelectLanguage() {
    this.showLanguageSettings = !this.showLanguageSettings;
  }

}
