import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AnimalListPage} from '../pages/animal-list/animal-list';
import {AnimalDetailPage} from '../pages/animal-detail/animal-detail';
import {PhotoModalPage} from '../pages/photo-modal/photo-modal';
import {HttpClientModule} from '@angular/common/http';
import {IFarmEvents} from '../pages/events/events';
import {IFarmProvider} from './ifarm.app.provider';
import {AreaListPage} from '../pages/area-list/area-list';
import {AreaDetailPage} from '../pages/area-detail/area-detail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AnimalListPage,
    ListPage,
    AnimalDetailPage,
    PhotoModalPage,
    IFarmEvents,
    AreaListPage,
    AreaDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AnimalListPage,
    ListPage,
    AnimalDetailPage,
    PhotoModalPage,
    IFarmEvents,
    AreaListPage,
    AreaDetailPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IFarmProvider
  ]
})
export class AppModule {}
