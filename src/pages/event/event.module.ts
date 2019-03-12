import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventPage } from './event';
import {EventListPage} from "./event-list/event-list";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app/app.module";
import {EventProvider} from "../../providers/event/event";

@NgModule({
  declarations: [
    EventPage,
    EventListPage,
  ],
  exports: [
    EventPage,
    EventListPage,
  ],
  imports: [
    IonicPageModule.forChild(EventPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers:[
    EventProvider
  ]
})
export class EventPageModule {}
