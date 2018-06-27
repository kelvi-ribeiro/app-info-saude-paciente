import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocaisExamePage } from './locais-exame';


@NgModule({
  declarations: [
    LocaisExamePage,
  ],
  imports: [
    IonicPageModule.forChild(LocaisExamePage),
  ],
  providers:[

  ]
})
export class LocaisExamePageModule {}
