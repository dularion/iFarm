import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DotsMenuPage } from './dots-menu';

@NgModule({
  declarations: [
    DotsMenuPage,
  ],
  exports: [
    DotsMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(DotsMenuPage),
  ],
})
export class DotsMenuPageModule {}
