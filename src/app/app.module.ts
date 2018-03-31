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
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {IFarmEvents} from '../pages/events/events';
import {AreaListPage} from '../pages/area-list/area-list';
import {AreaDetailPage} from '../pages/area-detail/area-detail';
import {VehicleListPage} from '../pages/vehicle-list/vehicle-list';
import {VehicleDetailPage} from '../pages/vehicle-detail/vehicle-detail';
import { AnimalProvider } from '../providers/animal/animal';
import { PageProvider } from '../providers/page/page';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    AreaDetailPage,
    VehicleListPage,
    VehicleDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
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
    AreaDetailPage,
    VehicleListPage,
    VehicleDetailPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AnimalProvider,
    PageProvider
  ]
})
export class AppModule {}
