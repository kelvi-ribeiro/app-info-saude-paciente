import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicamentoPage } from './medicamento';


@NgModule({
  declarations: [
    MedicamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicamentoPage),
  ],

})
export class MedicamentoPageModule {}
