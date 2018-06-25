import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoMedicamentosPage } from './historico-medicamentos';

@NgModule({
  declarations: [
    HistoricoMedicamentosPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoMedicamentosPage),
  ],
})
export class HistoricoMedicamentosPageModule {}
