import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalExamePage } from './local-exame';



@NgModule({
  declarations: [
    LocalExamePage,
  ],
  imports: [
    IonicPageModule.forChild(LocalExamePage),
  ],
  providers:[

  ]
})
export class LocalExamePageModule {}
