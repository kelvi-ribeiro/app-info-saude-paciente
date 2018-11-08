import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormExamePage } from './form-exame';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FormExamePage,
  ],
  imports: [
    IonicPageModule.forChild(FormExamePage),
    ComponentsModule
  ],
})
export class FormExamePageModule {}
