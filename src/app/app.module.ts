import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, Injectable, Injector, NgModule} from '@angular/core';
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
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AreaListPage} from '../pages/area-list/area-list';
import {AreaDetailPage} from '../pages/area-detail/area-detail';
import {VehicleListPage} from '../pages/vehicle-list/vehicle-list';
import {VehicleDetailPage} from '../pages/vehicle-detail/vehicle-detail';
import { AnimalProvider } from '../providers/animal/animal';
import { PageProvider } from '../providers/page/page';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Api} from '../providers/api/api';
import {User} from '../providers/user/user';
import {Pro} from '@ionic/pro';
import {WelcomePageModule} from '../pages/welcome/welcome.module';
import { DateProvider } from '../providers/date/date';
import {IonicStorageModule} from "@ionic/storage";
import { StorageProvider } from '../providers/storage/storage';
import { DotsMenuProvider } from '../providers/dots-menu/dots-menu';
import {DotsMenuPage} from "../pages/dots-menu/dots-menu";
import {EventPageModule} from "../pages/event/event.module";
import {EventPage} from "../pages/event/event";
import {EventListPage} from "../pages/event/event-list/event-list";
import { EventProvider } from '../providers/event/event';
import {EntityEventsPage} from "../pages/event/entity-events/entity-events";
import {NotificationsPage} from "../pages/notifications/notifications";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

Pro.init('dce29fb0', {
  appVersion: '0.0.2'
});

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AnimalListPage,
    ListPage,
    AnimalDetailPage,
    PhotoModalPage,
    AreaListPage,
    AreaDetailPage,
    VehicleListPage,
    VehicleDetailPage,
    DotsMenuPage,
    NotificationsPage
  ],
  imports: [
    WelcomePageModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    EventPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AnimalListPage,
    ListPage,
    AnimalDetailPage,
    PhotoModalPage,
    AreaListPage,
    AreaDetailPage,
    VehicleListPage,
    VehicleDetailPage,
    EventPage,
    EventListPage,
    DotsMenuPage,
    EntityEventsPage,
    NotificationsPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AnimalProvider,
    PageProvider,
    Api,
    User,
    IonicErrorHandler,
    [{ provide: ErrorHandler, useClass: MyErrorHandler }],
    DateProvider,
    StorageProvider,
    DotsMenuProvider,
    EventProvider
  ]
})
export class AppModule {}
