import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjudaPage } from './ajuda';
;
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AjudaPage    
  ],
  imports: [
    IonicPageModule.forChild(AjudaPage),
    ComponentsModule
  ],
})
export class AjudaPageModule {}
