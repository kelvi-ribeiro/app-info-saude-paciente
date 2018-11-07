import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoMedicamentoPage } from './historico-medicamento';
import { PipeModule } from '../../pipes/pipe.module';
import { ComponentsModule } from '../../components/components.module';





@NgModule({
  declarations: [
    HistoricoMedicamentoPage,
    
  ],
  imports: [
    IonicPageModule.forChild(HistoricoMedicamentoPage),
    PipeModule,
    ComponentsModule
  ],

})
export class HistoricoMedicamentoPageModule {}
