import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoMedicamentoPage } from './historico-medicamento';
import { PipeModule } from '../../pipes/pipe.module';





@NgModule({
  declarations: [
    HistoricoMedicamentoPage,
    
  ],
  imports: [
    IonicPageModule.forChild(HistoricoMedicamentoPage),
    PipeModule
  ],

})
export class HistoricoMedicamentoPageModule {}
