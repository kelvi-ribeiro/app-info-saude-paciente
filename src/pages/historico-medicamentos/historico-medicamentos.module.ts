import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoMedicamentosPage } from './historico-medicamentos';
import { MedicamentoService } from '../../services/domain/medicamento.service';

@NgModule({
  declarations: [
    HistoricoMedicamentosPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoMedicamentosPage),
  ],
  providers: [
    MedicamentoService
  ]
})
export class HistoricoMedicamentosPageModule {}
