import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalExamePage } from './local-exame';
import { PipeModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    LocalExamePage,
  ],
  imports: [
    IonicPageModule.forChild(LocalExamePage),
    PipeModule
  ],
 
})
export class LocalExamePageModule {}
