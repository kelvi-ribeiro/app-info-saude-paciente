import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesMensagemPage } from './detalhes-mensagem';
import { InteracaoService } from '../../services/domain/interacao.service';

@NgModule({
  declarations: [
    DetalhesMensagemPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesMensagemPage),
  ],
  providers:[
    InteracaoService
  ]
})
export class DetalhesMensagemPageModule {}
