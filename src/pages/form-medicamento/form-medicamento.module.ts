import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormMedicamentoPage } from './form-medicamento';
import { TipoMedicamentoService } from '../../services/domain/tipo.medicamento.service';

@NgModule({
  declarations: [
    FormMedicamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(FormMedicamentoPage),
  ],
  providers:[
    TipoMedicamentoService
  ]
})
export class FormMedicamentoPageModule {}
