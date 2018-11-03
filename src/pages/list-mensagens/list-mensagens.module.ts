import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMensagensPage } from './list-mensagens';
import { MensagemService } from '../../services/domain/mensagem.service';

@NgModule({
  declarations: [
    ListMensagensPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMensagensPage),
  ],
  providers:[
    MensagemService
  ]
})
export class ListMensagensPageModule {}
