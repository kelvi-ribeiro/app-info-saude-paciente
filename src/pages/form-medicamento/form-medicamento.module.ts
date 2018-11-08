import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormMedicamentoPage } from './form-medicamento';
import { TipoMedicamentoService } from '../../services/domain/tipo.medicamento.service';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FormMedicamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(FormMedicamentoPage),
    ComponentsModule
  ],
  providers:[
    TipoMedicamentoService
  ]
})
export class FormMedicamentoPageModule {}
