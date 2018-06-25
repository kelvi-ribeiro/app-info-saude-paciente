import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormMedicamentoPage } from './form-medicamento';

@NgModule({
  declarations: [
    FormMedicamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(FormMedicamentoPage),
  ],
})
export class FormMedicamentoPageModule {}
