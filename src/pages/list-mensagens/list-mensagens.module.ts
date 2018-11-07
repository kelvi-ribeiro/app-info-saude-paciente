import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMensagensPage } from './list-mensagens';
import { InteracaoService } from '../../services/domain/interacao.service';
import { PipeModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    ListMensagensPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMensagensPage),
    PipeModule
  ],
  providers:[    
    InteracaoService
  ]
})
export class ListMensagensPageModule {}
