import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalExamePage } from './local-exame';
import { PipeModule } from '../../pipes/pipe.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LocalExamePage,
  ],
  imports: [
    IonicPageModule.forChild(LocalExamePage),
    PipeModule,
    ComponentsModule
  ],
 
})
export class LocalExamePageModule {}
