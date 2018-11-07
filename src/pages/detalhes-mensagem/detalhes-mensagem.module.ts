import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesMensagemPage } from './detalhes-mensagem';
import { InteracaoService } from '../../services/domain/interacao.service';
import { PipeModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    DetalhesMensagemPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesMensagemPage),
    PipeModule
  ],
  providers:[
    InteracaoService
  ]
})
export class DetalhesMensagemPageModule {}
