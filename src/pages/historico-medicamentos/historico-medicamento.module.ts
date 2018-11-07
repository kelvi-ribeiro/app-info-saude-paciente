import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoMedicamentoPage } from './historico-medicamento';





@NgModule({
  declarations: [
    HistoricoMedicamentoPage,
    
  ],
  imports: [
    IonicPageModule.forChild(HistoricoMedicamentoPage)
  ],

})
export class HistoricoMedicamentoPageModule {}
